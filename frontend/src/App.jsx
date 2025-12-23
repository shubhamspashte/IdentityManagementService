import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignUpPage } from './pages/auth/registration'
import { SignInPage } from './pages/auth/login'
import { ProfilePage } from './pages/auth/profilePage'



function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
  
      </Routes>
    </BrowserRouter>
  )
}

export default App
