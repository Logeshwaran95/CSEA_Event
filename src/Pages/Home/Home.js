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
import data from '../../Data';


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
        // console.log("here is match --> ",response.data.data[0]);
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
        // console.log("here is match id ", response.data.data[0].id);
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
      // console.log(response1.data, "score calculated");
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
      // console.log(response2.data.data, "live match da");
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
      // console.log(response3.data, "3");
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
      const response4 = await axios.get(`${ip}/getplayerlist/${id}`);
      // console.log(response4.data.data, "here is player list");
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

    if(matchid%2==1){
      const data = await calculateScore(Math.ceil(matchid/2));
    }

    try {
      if(matchid%2==1)
      {
        const response4 = await getPlayerList(Math.ceil(matchid/2));
     
      }
      else
      {
       
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


  const liveMatch = {
    team1: 'India',
    team2: 'Australia',
    currentScore: '142/2',
    team1Flag: 'https://media.istockphoto.com/id/472317739/vector/flag-of-india.jpg?s=612x612&w=0&k=20&c=ejlQRX4C_Mb40wz1JQcB5vKYcOKlfRtry2W6UcX6mlo=',
    team2Flag: 'https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg',
  };


  useEffect(() => {
    // console.log("here is squad detail --> ",squaddetail);
    console.log("match id now is ---> ",matchid);
  },[squaddetail])

  const uniqueTeams = [...new Set(squaddetail.map(item => item.team))];

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
            marginTop:"3rem",
            width:"40vw",
            height:"20vh",
            borderRadius:"15px",
            //make it 3d color
            backgroundColor:"#f5f5f5",
            boxShadow:"5px 5px 5px 5px #888888",
            
          }}
          >

         {
          matchid==0 ? (
            <div>
            <h1
            style={{
              fontWeight:"bold",
              letterSpacing:"0.1rem",
            }}
            >
              No Match is Live
            </h1>
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
     {
      data.filter (item => item.id == matchid/2).map((item,index) => (
        <div
        key={index}
        style={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-around",
          alignItems:"center",
          width:"100%"
        }}
        >
           <Image 
           src = {item.team1flag}
      alt={liveMatch.team1} className={styles.flagImage} />
      <span className={styles.vs}>vs</span>
      <Image src={item.team2flag} alt={liveMatch.team2} className={styles.flagImage} />

        </div>
      ))

     }

      

    </div>
    :
          <div>
            <h1
               style={{
                fontWeight:"bold",
                letterSpacing:"0.1rem",
              }}
            >
              Match is Live
            </h1>
            <Button onClick={toggleTable} variant="primary"
            style={{
              width:"200px",
              marginTop:"1rem"
            }}
            >
        View Squad
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
                    <td>{index+1}</td>
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
        width:"200px",
        marginTop:"5rem"
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
