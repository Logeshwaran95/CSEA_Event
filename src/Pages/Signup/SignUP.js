import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import styles from './Signup.module.css'; // Import the CSS module

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <main className={styles.container}>
      <section>
        <div className={styles.signupForm}>
          <h2>Fantasy League</h2>
          <form>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <br></br>
            <button type="submit" onClick={onSubmit}>
              Sign up
            </button>
          </form>
          <br></br>
          <p>
            Already have an account?{' '}
            <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
