import React, { useEffect, useState,useContext } from 'react';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import styles from './Choices.module.css';
import axios from 'axios';
import ip from '../../config/Ip';
import { auth } from '../../config/firebase';
import { MatchContext } from '../../Context/MatchContext';
import {useNavigate} from 'react-router-dom';

const PlayerSelection = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const totalPoints = selectedPlayers.reduce((total, player) => total + player.points, 0);
  let remainingPoints = 100 - totalPoints;
  const [selected, setSelected] = useState(false);
  const { matchid, setMatchid,squaddetail,setSquaddetail } = useContext(MatchContext);
  const [numPlayersSelected, setNumPlayersSelected] = useState(0);

  const navigate = useNavigate();

  const selection = async () => {
    try{
      const response = await axios.get(`${ip}/getselected/${auth.currentUser.uid}`);
      console.log(response.data.isSelected);
      setSelected(response.data.isSelected);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
      selection();
  }, [squaddetail]);
  
  const handlePlayerSelection = (player) => {
    const existingPlayer = selectedPlayers.find((p) => p.id === player.id);
  
    if (existingPlayer) {
      Swal.fire('Player Already Selected', 'You cannot select the same player again.', 'info');
    } else if (remainingPoints < player.points) {
      Swal.fire('Not Enough Points', 'You do not have enough points to select this player.', 'info');
    } else if (selectedPlayers.length >= 11) {
      Swal.fire('Maximum Players Selected', 'You cannot select more than 11 players.', 'info');
    } else {
      Swal.fire({
        title: 'Select Role',
        html: `
          <p>${player.name} (Points: ${player.points})</p>
          <select id="playerRole" class="swal2-select">
            <option value="player">Player</option>
            <option value="captain">Captain</option>
            <option value="viceCaptain">Vice Captain</option>
          </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const playerRole = document.getElementById('playerRole').value;
  
          const captainSelected = selectedPlayers.find((p) => p.playerRole === 'captain');
          const viceCaptainSelected = selectedPlayers.find((p) => p.playerRole === 'viceCaptain');
  
          if ((playerRole === 'captain' && captainSelected) || (playerRole === 'viceCaptain' && viceCaptainSelected)) {
            Swal.fire(`${playerRole} Already Selected`, `You cannot select more than one ${playerRole}.`, 'info');
          } else {
            const updatedSquaddetail = squaddetail.filter((p) => p.id !== player.id);
            setNumPlayersSelected(numPlayersSelected + 1);
            setSelectedPlayers([...selectedPlayers, { ...player, playerRole: playerRole }]);
            setSquaddetail(updatedSquaddetail);
          }
        }
      });
    }
  };
  
  

  const handlePlayerRemoval = (player) => {
    Swal.fire({
      title: 'Remove Player',
      html: `
        <p>${player.name} (Points: ${player.points})</p>
        <p>Role: ${player.playerRole}</p>
      `,
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedPlayers(selectedPlayers.filter((selected) => selected.id !== player.id));
        setNumPlayersSelected(numPlayersSelected - 1);
      }
    });
  };

  const savetodatabase = async (players) => {
    if(players.length !=11 ){
      Swal.fire('Selection Not Saved!', 'You must select 11 players.', 'error');
      return;

    }
    else if (players.filter((player) => player.playerRole === 'captain').length != 1 || players.filter((player) => player.playerRole === 'viceCaptain').length != 1) {
      Swal.fire('Selection Not Saved!', 'You must select one captain and one vice captain.', 'error');
      return;
    }
    try{
        const response = await axios.post(`${ip}/addselection`,{
          id:auth.currentUser.uid,
          mid:Math.ceil(matchid/2),
          selection:players
        });
        console.log(response);
        Swal.fire('Selection Saved!', 'Your selection has been saved successfully.', 'success');

        window.location.reload();
    }
    catch(err){
      console.log(err);
    }

  }

  const handleSaveSelection = () => {

    const players = selectedPlayers.map((player) => ({ ...player, matchid: matchid }));
    console.log(players);

    savetodatabase(players);

  };

  const clearAllSelections = () => {
    setSelectedPlayers([]);
  };



  return (
    <div>
      {
          selected===false? <Row className={styles.playerSelectionContainer}
          style={{
            marginTop:"7rem"
          }}
          >
            <Col sm={12} className={styles.remainingPointsContainer}>
              <h2 className={styles.remainingPoints}>{remainingPoints} Points Remaining</h2>
              <h4 className={styles.remainingPoints}>{numPlayersSelected} Player(s) Selected</h4>
            </Col>
      
            <Col sm={12}>
              
              <center>
              <h2
              style={{
                letterSpacing:"0.1rem",
                textTransform:"uppercase",
                marginTop:"1rem"
              }}
              >Selected Players</h2>
              </center>
      
              <Row></Row>
            
              <ul className={styles.playerList}
                style={{
                  display:"flex",
                  flexDirection:"row",
                  flexWrap:"wrap",
                  justifyContent:"space-evenly",
                  listStyle:"none",
                  marginTop:"2rem"
                }}
              >
                {selectedPlayers.map((player) => (
                 
                   <li
                    key={player.id}
                    onClick={() => handlePlayerRemoval(player)}
                    className={styles.selectedPlayer}
                    style={{
                      width:"30rem",
                      height:"5rem",
                      textOverflow:"ellipsis",
                      overflow:"hidden",
                      whiteSpace:"nowrap"
                    }}
                  >
                    {/* <Image
                      src="https://via.placeholder.com/50"
                      alt={player.name}
                      roundedCircle
                      className={styles.playerImage}
                    /> */}
                    {player.name} (Role: {player.playerRole}, Points: {player.points} )
                  </li>
      
                ))}
              </ul>
            </Col>
      
            <Col sm={12}>
              <center>
              <h2
               style={{
                letterSpacing:"0.1rem",
                textTransform:"uppercase",
                marginTop:"2rem"
              }}
              >Available Players</h2>
              </center>
              <ul className={styles.playerList}
              style={{
                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                justifyContent:"space-evenly",
                listStyle:"none",
                marginTop:"2rem"
              }}
              >
                {squaddetail.map((player) => (
                  <li key={player.id} onClick={() => handlePlayerSelection(player)}
                  style={{
                    width:"20rem",
                    height:"5rem",
                  }}
                  >
                    {/* <Image
                      src="https://via.placeholder.com/50"
                      alt={player.name}
                      roundedCircle
                      className={styles.playerImage}
                    /> */}
                    {player.name} (Points: {player.points})
                  </li>
                ))}
              </ul>
            </Col>
            
           <center>
           <Button variant="danger" onClick={clearAllSelections} className={styles.clearButton}
            style={{
              width:"200px"
            }}
            >
                Clear All
              </Button>
           </center>
          
              <br></br>
            <Col sm={12} className={styles.saveButtonContainer}
            style={{
              marginTop:"1rem"
            }}
            >
              <center>
              <Button onClick={handleSaveSelection}
              style={{
                width:"200px"
              }}
              >Save Selection</Button>
              </center>
              
            </Col>
          </Row>
          : <div
          style={{
            marginTop:"7rem"
          }}
          >
            <Col sm={12} className={styles.remainingPointsContainer}>
              <h2 className={styles.remainingPoints}>You Already Selected </h2>
            </Col>
          </div>
        }
      </div>

  );
};

export default PlayerSelection;
