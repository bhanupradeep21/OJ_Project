import './App.css'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'
import SignUp from './Components/SignUp/signUp'
import Login from './Components/Login/login'
import Home from './Components/home/home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
