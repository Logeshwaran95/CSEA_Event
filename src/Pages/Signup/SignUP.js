import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import styles from './Signup.module.css'; // Import the CSS module
import Swal from 'sweetalert2';
import axios from 'axios';
import ip from '../../config/Ip';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');


  const onSubmit = async (e) => {


    e.preventDefault();
    
    if( phone.length !== 10){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Phone Number',
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      
    const data = {
      email: email,
      name : username,
      phno: phone,
      id: user.uid
    }

    try{
      const response = axios.post(`${ip}/signup`, data);
      console.log(response);
      navigate("/login");
    }
    catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }



     
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
                className={
                  styles.inputs
                }
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
                className={
                  styles.inputs
                }
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className={
                  styles.inputs
                }
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone"
                className={
                  styles.inputs
                }
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
