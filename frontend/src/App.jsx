import './App.css'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'
import SignUp from './Components/SignUp/signUp'
import Login from './Components/Login/login'
import Home from './Components/home/home'
import Navbar from './Components/Navbar/Navbar'

function App() {
  const user = {
    username: 'JohnDoe',
    profileImage: 'https://imgs.search.brave.com/q_Mfdl5QDC_AYPng3SsWd2qOM2QsB1wSji5_xIFk2cM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RkL2Yw/LzExL2RkZjAxMTBh/YTE5ZjQ0NTY4N2I3/Mzc2NzllZWM5Y2Iy/LmpwZw'
  };


  return (
    <>
      
      <Router>
      <Navbar user={user} />
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
