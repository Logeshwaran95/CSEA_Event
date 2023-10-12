import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Image } from 'react-bootstrap';
import styles from './Home.module.css';
import Swal from 'sweetalert2';

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'green',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  // useEffect(() => {
  //   Toast.fire({
  //     icon: 'success',
  //     title: 'Signed in successfully',
  //   });
  // }, []);



  const toggleModal = () => {
    setShowModal(!showModal);
  }

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
  };

  const liveMatch = {
    team1: 'India',
    team2: 'Australia',
    currentScore: '142/2',
    team1Flag: 'https://media.istockphoto.com/id/472317739/vector/flag-of-india.jpg?s=612x612&w=0&k=20&c=ejlQRX4C_Mb40wz1JQcB5vKYcOKlfRtry2W6UcX6mlo=',
    team2Flag: 'https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg',
  };

  const previousMatches = [
    {
      id: 101,
      team1: 'Team A',
      team2: 'Team B',
      date: '2023-10-10',
      time: '09:30',
    },
    {
      id: 102,
      team1: 'Team P',
      team2: 'Team Q',
      date: '2023-10-12',
      time: '14:45',
    },
    {
      id: 103,
      team1: 'Team X',
      team2: 'Team Y',
      date: '2023-10-14',
      time: '19:00',
    },
  ];

  const upcomingMatches = [
    {
      id: 104,
      team1: 'Team M',
      team2: 'Team N',
      date: '2023-10-16',
      time: '09:30',
    },
    {
      id: 105,
      team1: 'Team U',
      team2: 'Team V',
      date: '2023-10-18',
      time: '14:45',
    },
    {
      id: 106,
      team1: 'Team Z',
      team2: 'Team W',
      date: '2023-10-20',
      time: '19:00',
    },
  ];

  return (
    <div>
  

      <div className={styles.matchContainer}

      >

        <section>
          <h2
          style={{
            margin:"1rem"
          }}
          >Go Live</h2>
          <div className={styles.liveMatch}>
  <div className={styles.teamFlags}
        onClick={
          () => {
            navigate("/live");
          }
        }
  >
    <Image src={liveMatch.team1Flag} alt={liveMatch.team1} className={styles.flagImage} />
    <span className={styles.vs}>vs</span>
    <Image src={liveMatch.team2Flag} alt={liveMatch.team2} className={styles.flagImage} />
  </div>
 
</div>
<h1 className={styles.currentScore}>{liveMatch.currentScore}</h1>

        </section>
      </div>



      <Modal show={showModal} onHide={toggleModal} centered>
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

      <div
      
      className={
        styles.match
      }>

        
      <section className={
        styles.mat
      }>
          <h2>Upcoming Matches</h2>
          <br></br>
          <ul className={styles.matchList}>
            {
              upcomingMatches.map((match) => (
                <li key={match.id} className={styles.matchItem} onClick={() => toggleModal()}>
                  {match.team1} vs. {match.team2} - {match.date}, {match.time}
                </li>
              ))

            }
          </ul>
        </section>

        <section
        className={
          styles.mat
        }
        >
          <h2>Previous Matches</h2>
          <br></br>
          <ul className={styles.matchList}>
            {previousMatches.map((match) => (
              <li
                key={match.id}
                className={styles.matchItem}
                onClick={() => toggleModal()}
              >
                {match.team1} vs. {match.team2} - {match.date}, {match.time}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}

export default Home;
