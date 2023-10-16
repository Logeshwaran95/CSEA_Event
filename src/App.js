import React, { useState, useEffect } from 'react';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/SignUP';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth methods
import { auth } from './config/firebase'; // Import your Firebase configuration
import Live from './Pages/LiveMatch/Live';
import NavBar from './Components/Navbar/Navbar';
import Selection from './Pages/Selection/Selection';
import Choices from './Pages/Choices/Choices';
import Leaderboard from './Pages/Leaderboard/Leadeboard';
import Footer from './Components/Footer/Footer';
import { MatchContextProvider } from './Context/MatchContext';

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

  const HomeScreen = () => {
    return (
      <div>
        <NavBar/>
        <Home/>
        <Footer/>
      </div>
    )
  }

  const LiveScreen = () => {
    return (
      <div>
        <NavBar/>
        <Live/>
        <Footer/>
      </div>
    )
  }

  const SelectionScreen = () => {
    return (
      <div>
        <NavBar/>
        <Selection/>
        <Footer/>
      </div>
    )
  }

  const ChoicesScreen = () => {
    return (
      <div>
        <NavBar/>
        <Choices/>
        <Footer/>
      </div>
    )
  }

  const LeaderboardScreen = () => {
    return (
      <div>
        <NavBar/>
        <Leaderboard/>
        <Footer/>
      </div>
    )
  }
  

  return (
    <Router>
      <div>
        <section>



          <Routes>
            {/* Redirect to /home if the user is already signed in */}
          
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Signup />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/live" element={<LiveScreen />} />
            <Route path="/selection" element={<SelectionScreen />} />
            <Route path="/choices" element={<ChoicesScreen />} />
            <Route path="/leaderboard" element={<LeaderboardScreen />} />
          </Routes>


        </section>
      </div>
    </Router>
  );
}

export default App;
