import React, { useState } from 'react';
import styles from './signUp.module.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateofjoining: '',
    profileinfo: ''
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === '' || formData.email === '' || formData.password === '' || formData.dateofjoining === '' || formData.profileinfo === '') {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        console.log('Failed to submit form');
        return;
      }
      alert('Form submitted successfully! Please login now.');
      navigate('/login');

    } catch (err) {
      console.error('Error on submitting form', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" value={formData.name} name='name' onChange={onChange} placeholder="Name"/>
        <input type="email" value={formData.email} name='email' onChange={onChange} placeholder="Email"/>
        <input type="password" value={formData.password} name='password' onChange={onChange} placeholder="Password" />
        <input type="date" value={formData.dateofjoining} name='dateofjoining' onChange={onChange} placeholder="Date of Joining" />
        <textarea value={formData.profileinfo} name='profileinfo' onChange={onChange} placeholder="Profile Information"/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
