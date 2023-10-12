import React, { useState, useEffect } from 'react';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/SignUP';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth methods
import { auth } from './config/firebase'; // Import your Firebase configuration
import Live from './Pages/LiveMatch/Live';
import NavBar from './Components/Navbar/Navbar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check the authentication status when the app loads
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Unsubscribe when the component unmounts to avoid memory leaks
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div>
        <section>
        <NavBar/>
          <Routes>
            {/* Redirect to /home if the user is already signed in */}
          
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Signup />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/live" element={<Live />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
