import { SignUp, Login, Home } from './pages'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [token, setToken] = useState(false)

  useEffect(() => {
    const saved_token = sessionStorage.getItem('token')
    if (saved_token) {
      setToken(JSON.parse(saved_token))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/home" element={<Home token={token} />} />
      </Routes>
    </>
  )
}

export default App