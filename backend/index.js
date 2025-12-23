import dotenv from 'dotenv'
import connectDB from './src/db/connections.js'
import app from './src/app.js'




dotenv.config()
console.log("🚨 SERVER ENTRY FILE EXECUTED");

console.log('Starting server...');
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const port = process.env.PORT || 3000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
