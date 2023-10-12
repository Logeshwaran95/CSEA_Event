import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import styles from './Choices.module.css';

const playerData = [
  {
    id: 1,
    name: 'Virat Kohli',
    team: 'India',
    points: 20,
  },
  {
    id: 2,
    name: 'Rohit Sharma',
    team: 'India',
    points: 18,
  },
  {
    id: 3,
    name: 'Jasprit Bumrah',
    team: 'India',
    points: 15,
  },
  {
    id: 4,
    name: 'Shikhar Dhawan',
    team: 'India',
    points: 16,
  },
  {
    id: 5,
    name: 'KL Rahul',
    team: 'India',
    points: 17,
  },
  {
    id: 6,
    name: 'Hardik Pandya',
    team: 'India',
    points: 18,
  },
  {
    id: 7,
    name: 'Steve Smith',
    team: 'Australia',
    points: 19,
  },
  {
    id: 8,
    name: 'David Warner',
    team: 'Australia',
    points: 21,
  },
  {
    id: 9,
    name: 'Pat Cummins',
    team: 'Australia',
    points: 16,
  },
  {
    id: 10,
    name: 'Glenn Maxwell',
    team: 'Australia',
    points: 17,
  },
  {
    id: 11,
    name: 'Cheteshwar Pujara',
    team: 'India',
    points: 16,
  },
  {
    id: 12,
    name: 'Ravindra Jadeja',
    team: 'India',
    points: 18,
  },
  {
    id: 13,
    name: 'Marnus Labuschagne',
    team: 'Australia',
    points: 20,
  },
  {
    id: 14,
    name: 'Adam Zampa',
    team: 'Australia',
    points: 15,
  },
  {
    id: 15,
    name: 'Tim Paine',
    team: 'Australia',
    points: 14,
  },
  {
    id: 16,
    name: 'Ishant Sharma',
    team: 'India',
    points: 15,
  },
  {
    id: 17,
    name: 'Shubman Gill',
    team: 'India',
    points: 16,
  },
  {
    id: 18,
    name: 'Nathan Lyon',
    team: 'Australia',
    points: 15,
  },
  {
    id: 19,
    name: 'Rishabh Pant',
    team: 'India',
    points: 18,
  },
  {
    id: 20,
    name: 'Josh Hazlewood',
    team: 'Australia',
    points: 16,
  },
  {
    id: 21,
    name: 'Mayank Agarwal',
    team: 'India',
    points: 17,
  },
  {
    id: 22,
    name: 'Mitchell Starc',
    team: 'Australia',
    points: 17,
  },
  {
    id: 23,
    name: 'Ravichandran Ashwin',
    team: 'India',
    points: 19,
  },
  {
    id: 24,
    name: 'Cameron Green',
    team: 'Australia',
    points: 16,
  },
  {
    id: 25,
    name: 'Ajinkya Rahane',
    team: 'India',
    points: 18,
  },
  {
    id: 26,
    name: 'Matthew Wade',
    team: 'Australia',
    points: 15,
  },
  {
    id: 27,
    name: 'Mohammed Shami',
    team: 'India',
    points: 17,
  },
  {
    id: 28,
    name: 'Travis Head',
    team: 'Australia',
    points: 15,
  },
  {
    id: 29,
    name: 'Hanuma Vihari',
    team: 'India',
    points: 16,
  },
  {
    id: 30,
    name: 'James Pattinson',
    team: 'Australia',
    points: 14,
  },
];



const PlayerSelection = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const totalPoints = selectedPlayers.reduce((total, player) => total + player.points, 0);
  const remainingPoints = 200 - totalPoints;


  const handlePlayerSelection = (player) => {
    const existingPlayer = selectedPlayers.find((p) => p.id === player.id);

    if (existingPlayer) {
      Swal.fire('Player Already Selected', 'You cannot select the same player again.', 'info');
    }

    else if (remainingPoints < player.points) {
      Swal.fire('Not Enough Points', 'You do not have enough points to select this player.', 'info');
    }
  
    else {
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
          
          //check if captain or vice captain already selected
          const captainSelected = selectedPlayers.find((p) => p.role === 'captain');
          const viceCaptainSelected = selectedPlayers.find((p) => p.role === 'viceCaptain');

          if (playerRole === 'captain' && captainSelected) {
            Swal.fire('Captain Already Selected', 'You cannot select more than one captain.', 'info');

          }
          else if (playerRole === 'viceCaptain' && viceCaptainSelected) {
            Swal.fire('Vice Captain Already Selected', 'You cannot select more than one vice captain.', 'info');
          }
          else{
            setSelectedPlayers([...selectedPlayers, { ...player, role: playerRole }]);
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
        <p>Role: ${player.role}</p>
      `,
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedPlayers(selectedPlayers.filter((selected) => selected.id !== player.id));
      }
    });
  };

  const handleSaveSelection = () => {
    let message = 'Selected Players:\n';
    selectedPlayers.forEach((player) => {
      message += `${player.name} - ${player.role}\n`;
    });

    Swal.fire('Selection Saved!', message, 'success');
  };

  const clearAllSelections = () => {
    setSelectedPlayers([]);
  };

  return (
    <Row className={styles.playerSelectionContainer}
    style={{
      marginTop:"7rem"
    }}
    >
      <Col sm={12} className={styles.remainingPointsContainer}>
        <h2 className={styles.remainingPoints}>{remainingPoints} Points Remaining</h2>
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
            listStyle:"none"
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
              <Image
                src="https://via.placeholder.com/50"
                alt={player.name}
                roundedCircle
                className={styles.playerImage}
              />
              {player.name} (Role: {player.role}, Points: {player.points} )
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
          marginTop:"1rem"
        }}
        >Available Players</h2>
        </center>
        <ul className={styles.playerList}
        style={{
          display:"flex",
          flexDirection:"row",
          flexWrap:"wrap",
          justifyContent:"space-evenly",
          listStyle:"none"
        }}
        >
          {playerData.map((player) => (
            <li key={player.id} onClick={() => handlePlayerSelection(player)}
            style={{
              width:"20rem",
              height:"5rem",
            }}
            >
              <Image
                src="https://via.placeholder.com/50"
                alt={player.name}
                roundedCircle
                className={styles.playerImage}
              />
              {player.name} (Points: {player.points})
            </li>
          ))}
        </ul>
      </Col>
      
     
      <Button variant="danger" onClick={clearAllSelections} className={styles.clearButton}>
          Clear All
        </Button>
        <br></br>
      <Col sm={12} className={styles.saveButtonContainer}
      style={{
        marginTop:"1rem"
      }}
      >
        <Button onClick={handleSaveSelection}>Save Selection</Button>
      </Col>
    </Row>
  );
};

export default PlayerSelection;
