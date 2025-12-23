import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()



// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Middleware
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

// Routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

app.get('/', (req, res) => {
    res.json({ message: 'Backend API is running!', endpoints: { auth: '/api/auth', users: '/api/users' } });
});

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


export default app