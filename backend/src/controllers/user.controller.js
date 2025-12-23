import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { encrypt, decrypt } from "../utils/encryption.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password, aadhaar } = req.body;

    if ([fullname, email, password, aadhaar].some(v => !v?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const exists = await User.findOne({ email });
    if (exists) {
        throw new ApiError(409, "User already exists");
    }

    const encryptedAadhaar = encrypt(aadhaar);

    const user = await User.create({
        fullname,
        email,
        password,
        aadhaar: encryptedAadhaar
    });

    const safeUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(201)
        .json(new ApiResponse(201, safeUser, "User registered successfully"));
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;



    if ([email, password].some(v => !v?.trim())) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    const valid = await user.isPasswordCorrect(password);
    if (!valid) throw new ApiError(401, "Invalid credentials");

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    const safeUser = await User.findById(user._id)
        .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    };

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            { user: safeUser, accessToken },
            "Login successful"
        ));
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 }
    });

    return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "Logged out"));
});

// const getUserProfile = asyncHandler(async (req, res) => {
//     // const user = await User.findById(req.user._id).select("-password -refreshToken");
//     const user = await User.findById(user._id).select("_id fullname email createdAt");

//     if (!user) throw new ApiError(404, "User not found");

//     const decrypted = decrypt(user.aadhaar);
//     const masked = decrypted.replace(/\d(?=\d{4})/g, "X");

//     return res.json(
//         new ApiResponse(200, {
//             ...user.toObject(),
//             aadhaar: masked
//         }, "Profile fetched")
//     );
// });



const getUserProfile = asyncHandler(async (req, res) => {

    // 🔐 Safety check (prevents future 500s)
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await User
        .findById(req.user._id)
        .select("_id fullname email createdAt aadhaar");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 🔐 Decrypt + mask Aadhaar
    const decrypted = decrypt(user.aadhaar);
    const masked = decrypted.replace(/\d(?=\d{4})/g, "X");
   

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                ...user.toObject(),
                aadhaar: masked
            },
            "Profile fetched"
        )
    );
});


export { registerUser, loginUser, logoutUser, getUserProfile };