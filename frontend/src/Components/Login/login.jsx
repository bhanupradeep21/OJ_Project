import React, { useState } from 'react'
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();


  const onSubmit = async (e)=>{
    e.preventDefault();
    if (email === '' || password === ''){
      alert('All fields are required')
      return ;
    }
    const response = await fetch('http://localhost:8000/auth/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,password})
    })

    if (!response.ok){
      console.log('Login Failed');
      alert('invalid credentials');
      return ;
    }
    console.log('Login Successfull')
    console.log(response)

    const responseData = await response.json();
    console.log(responseData);
    localStorage.setItem('token',responseData.token)
    localStorage.setItem('userid',responseData.userid)
    navigate('/home')
    
  }
  const onChange = (e)=>{
    const {name,value} = e.target
    if (name == 'email'){
      setEmail(value)
    }
    else if (name == 'password'){
      setPassword(value)
    }

  }

  return (
    <>
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <input type="email" placeholder="Email" name="email" value={email} onChange={(e) =>onChange(e)}/>
        <input type="password" placeholder="Password" name="password" value={password} onChange={(e) =>onChange(e)}/>
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}
