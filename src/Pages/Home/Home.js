import React, { useEffect, useState,useContext } from 'react';
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


const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // const [userName, setUserName] = useState();
  // const [matchid, setMatchid] = useState(0);
  const { matchid, setMatchid,squaddetail,setSquaddetail } = useContext(MatchContext);

  const [matchdetail,setMatchdetail] = useState({});
  // const [squaddetail,setSquaddetail] = useState([]);

  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const getmatch = async() => {
      try{
        const response = await axios.get(`${ip}/getmatch/${matchid}`);
        console.log("here is match --> ",response.data.data[0]);
        setMatchdetail(response.data.data[0]);
      }
      catch(err){
        console.log(err);
        alert(err);
      }
  }

  const getmatchid = async() => {
    try{

        const response = await axios.get(`${ip}/getmatchid`);
        console.log("here is match id ", response.data.data[0].id);
        setMatchid(response.data.data[0].id);
        // alert(response.data.data[0].id);
    }
    catch(err){
        console.log(err);
        alert(err);
    }
  }
  const calculateScore = async (id) => {
    try {
      const response1 = await axios.get(`${ip}/calculatescore/${id}`);
      console.log(response1.data, "1");
      
      setSquaddetail([]);

      return response1;
    } catch (err) {
      console.log(err);
      alert(err);
      return err;
    }
  }
  
  const getMatchById = async (id) => {
    try {
      const response2 = await axios.get(`${ip}/getmatch/${id}`);
      console.log(response2.data.data, "live match da");
      setMatchdetail(response2.data.data);
      return response2;
    } catch (err) {
      console.log(err);
      alert(err);
      return err;
    }
  }
  
  const matchIdIncrement = async () => {
    try {
      const response3 = await axios.patch(`${ip}/patchmatchid`, {
        matchid: matchid + 1
      });
      console.log(response3.data, "3");
      setMatchid(matchid + 1);
      return response3;
    } catch (err) {
      console.log(err);
      alert(err);
      return err;
    }
  }
  
  const getPlayerList = async (id) => {
    try {
      const response4 = await axios.get(`${ip}/getplayerlist/${id+1}`);
      console.log(response4.data.data, "here is player list");
      setSquaddetail(response4.data.data);
      // localStorage.setItem("squaddetail",JSON.stringify(response4.data.data));
      // localStorage.setItem("matchid",id+1);
      return response4;
    } catch (err) {
      console.log(err);
      alert(err);
      return err;
    }
  }
  
  const incrementMatchId = async () => {
    const response3 = await matchIdIncrement();
    try {
      // console.log(matchid,"sai x love")
      if(matchid%2==0)
      {
        const response4 = await getPlayerList(Math.ceil(matchid/2));
      }
      else
      {
        const data = await calculateScore(Math.ceil(matchid/2));
        // getmatch();
        const response2 = await getMatchById(Math.ceil(matchid/2));
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
    // alert(matchid);
  }

  useEffect(() => {

      getmatchid();
      if(matchid%2!=0){
        getPlayerList(Math.ceil(matchid/2));
      }
    
      getMatchById(Math.ceil(matchid/2));
      

  },[matchid]);



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

  useEffect(() => {
    console.log("here is squad detail --> ",squaddetail);
  },[squaddetail])

  const makezero = async () => {
    try{
      const response = await axios.put(`${ip}/zeromatchid`).then((res) => {
        setSquaddetail([]);
        // console.log("here is squad detail --> ",squaddetail)
        window.location.reload();
      })
      
    }
    catch(err){
      console.log(err);
      alert(err);
    }
  }

  return (
    <div
    style={{
      marginTop:"3rem"
    }}
    >
  
      <div className={styles.matchContainer} >

        <section>
        
          <div className={styles.liveMatch}
          style={{
            marginTop:"2rem"
          }}
          >

         {
          matchid==0 ? (
            <div
            
            >
            <h1>Match Not Started</h1>
            </div>
          
          )
          :
          
            
              matchid>0 && matchid%2==0 ? 
              <div className={styles.teamFlags}
          onClick={
            () => {
              navigate("/live",{
                state: {
                  matchdetail: matchdetail
                }
              });
            }
          }
    >
        {/* <h2
          style={{
            margin:"1rem",
          }}
          >Go Live</h2> */}
      <Image src={liveMatch.team1Flag} alt={liveMatch.team1} className={styles.flagImage} />
      <span className={styles.vs}>vs</span>
      <Image src={liveMatch.team2Flag} alt={liveMatch.team2} className={styles.flagImage} />
    </div>
    :
          <div>
            <h1>view squad</h1>
            <Button onClick={toggleTable} variant="primary"
            style={{
              width:"200px"
            }}
            >
        Show Table
      </Button>
          </div>
  
            }
          
 
        </div>

 
{/* <h1 className={styles.currentScore}>{liveMatch.currentScore}</h1> */}

        </section>
      </div>


      <Modal show={showTable} onHide={toggleTable} size="lg"
      fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Data Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {squaddetail.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.team}</td>
                  <td>{item.points}</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleTable}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

     <center>
     {
    auth.currentUser && auth.currentUser.email === "logesh@gmail.com" &&  (
      <div>

    
      <Button
      onClick={
        () => {
          incrementMatchId();
        }
      }
      style={{
        height:"60px",
        width:"200px"
      }}
      >Increment Match
        </Button>
        <br></br>
        <Button
             style={{
              height:"60px",
              marginTop:"1rem",
              width:"200px"
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
      }
      style={{
        flexWrap:"wrap"
      }}
      >

        
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
