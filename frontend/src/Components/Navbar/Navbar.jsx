import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ user }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">CodeJudge</Link>
      </div>
      <ul className={styles.navItems}>
        <li><Link to="/problems">Problems</Link></li>
        <li><Link to="/contests">Contests</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/discuss">Discuss</Link></li>
      </ul>
      <div className={styles.profile}>
        {user ? (
          <div className={styles.userInfo}>
            <span>{user.username}</span>
            <img 
              src={user.profileImage || 'https://via.placeholder.com/40'} 
              alt="Profile" 
              className={styles.profileImage}
            />
          </div>
        ) : (
          <Link to="/login" className={styles.loginButton}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;