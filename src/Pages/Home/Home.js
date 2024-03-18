import React, { useEffect, useState, useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Image } from 'react-bootstrap';
import styles from './Home.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import ip from '../../config/Ip';
import { MatchContext } from '../../Context/MatchContext';
import data from '../../Data';
const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { matchid, setMatchid, inningsid, setInningsid, squaddetail, setSquaddetail, getmatchid, getPlayerList, getMatchById, matchdetail } = useContext(MatchContext);
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };
  const calculateScore = async (id, inningsid) => {
    try {
      if (inningsid !== 0) {
        const response1 = await axios.get(`${ip}/calculatescore/${id}/${inningsid}`);
        setSquaddetail([]);
        return;
      }
    } catch (err) {
      console.log(err);
      alert(err);
      return err;
    }
  }
  const incrementMatchId = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Verified'
      })
      if (result.isConfirmed) {
        const response3 = await axios.put(`${ip}/incrementMatchId`);
        const currMatchId = response3.data.data.id
        const currInningsId = response3.data.data.inningsid
        setMatchid(currMatchId)
        setInningsid(currInningsId)
        if (currInningsId === 0) {
          await getPlayerList(currMatchId, currInningsId);
        }
        if (currInningsId === 1 || currInningsId === 2) {
          await calculateScore(currMatchId, currInningsId);
          await getMatchById(currMatchId, currInningsId)
        }
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  useEffect(() => {
    const fetch = async () => {
      if (matchid === -1 && inningsid === -1) {
        const response = await getmatchid();
        if (response.inningsid === 0) {
          await getPlayerList(response.matchid, response.inningsid);
        }
        if (response.inningsid === 1 || response.inningsid === 2) {
          await getMatchById(response.matchid, response.inningsid)
        }
      }
    }
    fetch();
  }, []);
  const toggleModal = () => {
    setShowModal(!showModal);
  }
  const liveMatch = {
    team1: 'India',
    team2: 'Australia',
    currentScore: '142/2',
    team1Flag: 'https://media.istockphoto.com/id/472317739/vector/flag-of-india.jpg?s=612x612&w=0&k=20&c=ejlQRX4C_Mb40wz1JQcB5vKYcOKlfRtry2W6UcX6mlo=',
    team2Flag: 'https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg',
  };


  // useEffect(() => {
  //   console.log("match id now is ---> ", matchid);
  // }, [squaddetail])

  const uniqueTeams = [...new Set(squaddetail.map(item => item.team))];

  const makezero = async () => {
    try {
      const response = await axios.put(`${ip}/zeromatchid`).then((res) => {
        setSquaddetail([]);
        window.location.reload();
      })

    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }



  return (
    <>
      <div
        style={{
          marginTop: "1rem"
        }}
      >

        <div className={styles.matchContainer} >

          <section>
            <div>
              {
                matchid === 0 ? (
                  <div>
                    <h1
                      style={{
                        fontWeight: "bold",
                        letterSpacing: "0.1rem",
                      }}
                    >
                      No Match is Live
                    </h1>
                  </div>

                )
                  :

                  (
                    matchid > 0 &&
                    <div>
                      <div className={styles.teamFlags}>
                        {
                          data.filter(item => item.id == matchid).map((item, index) => (
                            <div key={index} className={styles.container}>
                              <Image src={item.team1flag} alt={liveMatch.team1} className={styles.flagImage} />
                              <span className={styles.vs}>vs</span>
                              <Image src={item.team2flag} alt={liveMatch.team2} className={styles.flagImage} />
                            </div>
                          ))}
                      </div>
                      <br />
                      <div>
                        {
                          data.filter(item => item.id == matchid).map((item, index) => (
                            <div key={index} className={styles.container}>
                              <strong>{item.toss}</strong>
                            </div>
                          ))}
                      </div>
                      <br />
                      <div>
                        {
                          data.filter(item => item.id == matchid).map((item, index) => (
                            <div key={index} className={styles.container}>
                              <div>{item.commentary}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
              }
            </div>
            {inningsid === 0 && matchid > 0 &&
              <div>
                <br />
                <h1
                  style={{
                    fontWeight: "bold",
                    letterSpacing: "0.1rem",
                  }}
                >
                  Match is Live
                </h1>
                <Button onClick={toggleTable} variant="primary"
                  style={{
                    width: "200px",
                    marginTop: "1rem"
                  }}
                >
                  View Squad
                </Button>
              </div>}
            {matchid > 0 && inningsid > 0 &&
              <div>
                <br />
                <h1
                  style={{
                    fontWeight: "bold",
                    letterSpacing: "0.1rem",
                  }}
                >
                  Match has started!!!
                </h1>
                <Button onClick={
                  () => {
                    navigate("/live", {
                      state: {
                        matchdetail: matchdetail
                      }
                    });
                  }
                } variant="primary"
                  style={{
                    width: "200px",
                    marginTop: "1rem"
                  }}
                >
                  Match Scores
                </Button></div>}
          </section>
        </div >
        <Modal show={showTable} onHide={toggleTable} size="lg"
          fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title>Squad Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {uniqueTeams.map(teamName => (
                <div key={teamName}>
                  <h3>{teamName}</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {squaddetail
                        .filter(item => item.team === teamName)
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.team}</td>
                            <td>{item.points}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleTable}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <center>
          {
            auth.currentUser && auth.currentUser.email === "nikhilprasanna93@gmail.com" && (
              <div>

                <Button
                  onClick={
                    () => {
                      incrementMatchId();
                    }
                  }
                  style={{
                    height: "60px",
                    width: "200px",
                    marginTop: "5rem"
                  }}
                >Increment Match
                </Button>
                <br></br>
                <Button
                  style={{
                    height: "60px",
                    marginTop: "1rem",
                    width: "200px"
                  }}
                  onClick={
                    () => {
                      makezero();
                    }
                  }>
                  Make Zero
                </Button>
              </div>)
          }
        </center>
        <Table striped bordered hover responsive style={{ marginTop: "7rem" }}>
          <thead>
            <tr>
              <th
              >Match</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Stadium</th>
            </tr>
          </thead>
          <tbody>
            {data.map((match) => (
              <tr
                key={match.id}
                style={match.id === matchid ? { backgroundColor: 'red', fontWeight: 'bold' } : {}}
              >
                <td>{match.id}</td>
                <td>{match.team1}</td>
                <td>{match.team2}</td>
                <td>{match.stadium}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="container">
        <br />
        <h2>
          <strong>Welcome to our Fantasy League Website!</strong>
        </h2>
        <h3>1. Overview:</h3>
        <ul>
          <li>The fantasy league will take place over two days, the 19th and 20th of March.</li>
          <li>Each day will consist of four matches.</li>
          <li>Participants will have a 90 minutes window to select their players for each match.</li>
          <li>Match scores will be updated after every 45 minutes.</li>
          <li>The leaderboard will be continuously updated to reflect the current standings.</li>
        </ul>

        <h3>2. Player Selection:</h3>
        <ul>
          <li>Participants must select their players within the designated 90 minutes window for each match.</li>
          <li>Players must be selected based on the available player pool for each match.</li>
          <li>Once selected, players cannot be changed until the next selection window opens for the subsequent match.</li>
        </ul>

        <h3>3. Scoring System:</h3>
        <ul>
          <li>The scoring system is displayed under a separate tab on the website.</li>
          <li>Participants will accumulate points based on the performance of the players they have selected.</li>
        </ul>

        <h3>4. Match Scores:</h3>
        <ul>
          <li>Match scores will be updated after every hour to reflect the ongoing matches.</li>
          <li>Participants can view the live scores and track the performance of their selected players in real-time.</li>
        </ul>

        <h3>5. Leaderboard:</h3>
        <ul>
          <li>The leaderboard will be updated regularly to show the current rankings of participants.</li>
          <li>Rankings will be based on the total points accumulated by each participant throughout the fantasy league.</li>
          <li>Participants can monitor their progress and compare their rankings with other participants.</li>
        </ul>
        <h3>6. Amendments and Updates:</h3>
        <ul>
          <li>The organizers reserve the right to amend or update the rules and regulations as necessary.</li>
          <li>Participants will be notified promptly of any changes via the website or email.</li>
        </ul>

        <p>
          We wish you the best of luck and hope you enjoy the excitement of fantasy sports!
        </p>

        <p>If you have any questions or concerns, please contact our team for assistance.</p>
        <ul>
          <li>Navaneeth - <a href='tel:+91 9042142160'>+91 9042142160</a></li>
          <li>Logeshwaran - <a href='tel:+91 9345497171'>+91 9345497171</a></li>
          <li>Nikhil - <a href='tel:+91 6379066510'>+91 6379066510</a></li>
        </ul>
      </div>
    </>
  );
}

export default Home;
