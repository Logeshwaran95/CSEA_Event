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
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  useEffect(() => {
    const fetch = async () => {
      if (matchid === -1 && inningsid === -1) {
        const response  = await getmatchid();
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
  );
}

export default Home;
