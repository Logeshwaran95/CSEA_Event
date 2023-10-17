import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import the CSS module
import Swal from 'sweetalert2'; // Import SweetAlert2

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate("/home");
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    }
  };

  return (
    <main className={styles.container}>
       <ul className={styles.bg_bubbles}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
      <section>
        <div className={styles.loginForm}>
          <h2>Fantasy League</h2>
          <form
          >
            <div
            >
              <label htmlFor="email-address"
              >Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputs}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputs}
              />
            </div>
            <div>
              <br></br>
              <button onClick={onLogin}>Login</button>
            </div>
          </form>
          <p className={styles.text}>
            No account yet?{' '}
            <NavLink to="/signup">Sign up</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
