import React, { useState } from 'react';
import styles from './signUp.module.css';
import { useNavigate,Link } from 'react-router-dom';

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateofjoining: ''
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === '' || formData.email === '' || formData.password === '' || formData.dateofjoining === '' ) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
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

      <div className={styles.inputContainer}>
          <span className={styles.icon} ><i className="fas fa-user"></i></span>
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={onChange}
            placeholder="Name"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.icon}><i className="fas fa-envelope"></i></span>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={onChange}
            placeholder="Email"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.icon}><i className="fas fa-lock"></i></span>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={onChange}
            placeholder="Password"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.icon}><i className="fas fa-calendar-alt"></i></span>
          <input
            type="date"
            value={formData.dateofjoining}
            name="dateofjoining"
            onChange={onChange}
            placeholder="Date of Joining"
            className={styles.input}
          />
        </div>

      <button type='submit' className={`${styles.btn} ${styles['sign-up']}`}>sign up</button>
      </form>
      <p style={{ fontSize: '19px' }}>Already have an account?{' '}<Link to="/login" className={`${styles.btn} ${styles['sign-in']}`}>Login</Link></p>
    </div>
  );
};

export default Signup;
