#  Identity Management System (Aadhaar Encryption & Masking)

A secure **Identity Management System** that demonstrates how sensitive personal identifiers (Aadhaar numbers) can be **encrypted at rest**, **securely decrypted on the backend**, and **safely displayed in masked form** to the authenticated user.

This project focuses on **authentication**, **data security**, and **secure backend–frontend communication**, rather than business-domain logic.

---
##  Project Demo Video
Watch the complete project walkthrough here:  
https://drive.google.com/file/d/136UBT4HWr2o7xRRMf1iSJ04Xlh70wLKx/view?usp=drive_link


##  Purpose of the Project

The objective of this project is to demonstrate:

- Secure handling of sensitive identity data
- Encryption and decryption workflow
- Server-side masking of confidential information
- JWT-based authentication
- Protected routes in both frontend and backend

This is an **educational / demonstration project**, not a production Aadhaar service.

---

##  Features

###  Authentication
- User registration and login
- JWT-based authentication
- Token verification middleware
- Protected profile endpoint

###  Identity Profile
- View personal identity details:
  - Full Name
  - Email
  - User ID
  - Account creation date
- Aadhaar number handling:
  - Stored **encrypted** in database
  - Decrypted **only on the server**
  - Displayed as **masked (last 4 digits only)**

###  Security Measures
- Password hashing
- JWT authentication middleware
- AES-256 encryption for Aadhaar
- Server-side Aadhaar masking
- Frontend never receives full Aadhaar number

---

##  Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Crypto utilities for encryption/decryption

---

##  Project Structure

### Backend
<pre>
backend/
├── src/
│ ├── controllers/
│ │ └── user.controller.js
│ ├── db/
│ │ └── connections.js
│ ├── middlewares/
│ │ └── authMiddleware.js
│ ├── models/
│ │ └── user.model.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── userRoutes.js
│ ├── utils/
│ │ ├── apiError.js
│ │ ├── apiResponse.js
│ │ ├── asyncHandler.js
│ │ └── encryption.js
│ ├── app.js
│ └── constants.js
├── index.js
├── .env
└── package.json
</pre>

### Frontend
<pre>
frontend/
├── src/
│ ├── pages/
│ │ └── auth/
│ │ ├── login.jsx
│ │ ├── registration.jsx
│ │ └── profilePage.jsx
│ ├── App.jsx
│ ├── config.js
│ ├── main.jsx
│ └── index.css
├── index.html
└── package.json
</pre>



---

##  Authentication Flow

1. User logs in using email and password
2. Backend validates credentials
3. JWT access token is generated
4. Token is stored on client
5. Protected routes:
   - Token verified using middleware
   - `req.user._id` used to fetch identity data

---

##  Aadhaar Security Design

### Storage
- Aadhaar is encrypted before saving to MongoDB
- Plain Aadhaar is never stored

### Retrieval
- Aadhaar is decrypted only on backend
- Decrypted value is masked immediately
- Only masked Aadhaar is returned in API response

### UI Representation
XXXX XXXX 1234


This ensures:
- No sensitive data exposure
- Reduced frontend attack surface
- Clear trust boundary separation

---

##  API Endpoints
### Authentication
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Authenticate user |

### User Profile
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/users/profile` | Fetch authenticated user profile |

---

##  Environment Variables

Create a `.env` file in backend root:
PORT=8000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key


---

##  Running the Project

### Backend
- cd backend
- npm install
- npm run start




### Frontend
- cd frontend
- npm install
- npm run dev


---

##  AI-Assisted Development

This project was developed with the assistance of AI tools to improve productivity, code quality, and learning efficiency.  
All core design decisions and final implementations were reviewed and integrated manually.

###  AI-Assisted Tasks

The following tasks involved the use of AI tools:

- Used Cursor and Claude for Frontend Generation 
- Assisted in designing **secure Aadhaar encryption & decryption workflow**
- Assisted in writing **Profile API controller with proper error handling**
- Provided guidance on **secure backend–frontend data flow**
- Assisted in refactoring frontend navigation after login
- Helped structure the **README.md documentation**

All generated suggestions were **reviewed, modified, and validated** by the developer.

---

###  Effectiveness Score

**Effectiveness Score: 4 / 5**

**Justification:**
- AI tools significantly reduced debugging time for backend and authentication issues
- Helped identify logical and security flaws early (e.g., improper Aadhaar exposure)
- Improved documentation quality and project clarity
- Still required strong manual reasoning for:
  - Security decisions
  - API design
  - Error handling
  - Final code integration

AI acted as a **productivity and learning accelerator**, not a replacement for developer judgment.

---

##  Author

**Shubham Pashte**  
B.Tech Electronics VJTI



