import { SignUp, Login, Home } from './components'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/'} element={<Login setToken={setToken} />}  />
        {token ? <Route path={'/home'} element={<Home token={token} />} /> : ''}
      </Routes>
    </>
  )
}

export default App 