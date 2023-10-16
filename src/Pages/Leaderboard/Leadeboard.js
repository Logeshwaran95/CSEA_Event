import React,{useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import ip from '../../config/Ip';

// const leaderboardData = [
//   { rank: 1, username: 'User1', points: 500 },
//   { rank: 2, username: 'User2', points: 480 },
//   { rank: 3, username: 'User3', points: 450 },
//   { rank: 4, username: 'User4', points: 420 },
//   { rank: 5, username: 'User5', points: 400 },
//   { rank: 6, username: 'User6', points: 380 },
//   { rank: 7, username: 'User7', points: 360 },
//   { rank: 8, username: 'User8', points: 340 },
//   { rank: 9, username: 'User9', points: 320 },
//   { rank: 10, username: 'User10', points: 300 },
// ];

const Leaderboard = () => {

  const [leaderboardData,setLeaderboardData] = useState([]);

  const getData = async () => {
    try{
      const response = await axios.get(`${ip}/leaderboard`);
      console.log(response.data.data);
      setLeaderboardData(response.data.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  },[])


  return (
    <div
    style={{
        marginTop:"6rem"
    }}
    >
    <center>
    <h2
    style={{
        textTransform:"uppercase",
        letterSpacing:"0.1rem",
        fontWeight:"bold",
        marginBottom:"2rem"
    }}
    >Leaderboard</h2>
    </center>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user,key) => (
            <tr key={key}>
              <td>{key+1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;
