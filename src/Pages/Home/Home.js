import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'; // Import React-Bootstrap Modal
import Button from 'react-bootstrap/Button'; // Import React-Bootstrap Button
import Table from 'react-bootstrap/Table'; // Import React-Bootstrap Table
import styles from './Home.module.css'; // Import the CSS module

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [userName, setUserName] = useState('John Doe'); // Replace with the user's name

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error);
      });
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  // Dummy data for upcoming and previous matches
  const upcomingMatches = [
    {
      id: 1,
      team1: 'Team A',
      team2: 'Team B',
      date: '2023-10-15',
      time: '14:00',
    },
    {
      id: 2,
      team1: 'Team C',
      team2: 'Team D',
      date: '2023-10-18',
      time: '15:30',
    },
  ];

  const previousMatches = [
    {
      id: 101,
      team1: 'Team X',
      team2: 'Team Y',
      date: '2023-10-10',
      time: '13:30',
    },
    {
      id: 102,
      team1: 'Team P',
      team2: 'Team Q',
      date: '2023-10-12',
      time: '14:45',
    },
  ];

  // Dummy data for match statistics
  const matchStatistics = {
    id: 102,
    team1: 'Team P',
    team2: 'Team Q',
    date: '2023-10-12',
    time: '14:45',
    scoreTeam1: 220,
    scoreTeam2: 180,
    wicketsTeam1: 4,
    wicketsTeam2: 7,
    // Add more statistics as needed
  };

  return (
    <div>
      <nav className={styles.nav}>
        <h3>Welcome {userName}</h3> {/* Display the user's name */}
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className={styles.matchContainer}>
        <section>
          <h2>Upcoming Matches</h2>
          <ul className={styles.matchList}>
            {upcomingMatches.map((match) => (
              <li key={match.id} className={styles.matchItem}>
                {match.team1} vs. {match.team2} - {match.date}, {match.time}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Previous Matches</h2>
          <ul className={styles.matchList}>
            {previousMatches.map((match) => (
              <li
                key={match.id}
                className={styles.matchItem}
                onClick={() => toggleModal()} // Open the modal on click
              >
                {match.team1} vs. {match.team2} - {match.date}, {match.time}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Modal for Match Statistics */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Match Statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Team</th>
                <th>Score</th>
                <th>Wickets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{matchStatistics.team1}</td>
                <td>{matchStatistics.scoreTeam1}</td>
                <td>{matchStatistics.wicketsTeam1}</td>
              </tr>
              <tr>
                <td>{matchStatistics.team2}</td>
                <td>{matchStatistics.scoreTeam2}</td>
                <td>{matchStatistics.wicketsTeam2}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
