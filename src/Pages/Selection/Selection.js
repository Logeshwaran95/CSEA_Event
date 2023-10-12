import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import styles from './Selection.module.css';

const selectedPlayers = [
  {
    id: 1,
    name: 'Virat Kohli',
    team: 'India',
    points: 20,
    role: 'captain',
  },
  {
    id: 2,
    name: 'Rohit Sharma',
    team: 'India',
    points: 18,
    role: 'viceCaptain',
  },
  {
    id: 3,
    name: 'Jasprit Bumrah',
    team: 'India',
    points: 15,
    role: 'player',
  },
  {
    id: 4,
    name: 'Shikhar Dhawan',
    team: 'India',
    points: 16,
    role: 'player',
  },
  {
    id: 5,
    name: 'KL Rahul',
    team: 'India',
    points: 17,
    role: 'player',
  },
];

const ChoicesScreen = () => {
  const captain = selectedPlayers.find((player) => player.role === 'captain');
  const viceCaptain = selectedPlayers.find((player) => player.role === 'viceCaptain');
  const otherPlayers = selectedPlayers.filter((player) => player.role === 'player');

  return (
    <Row className={styles.choicesScreenContainer}
    style={{
        marginTop:"4rem"
    }}
    >
      <Col sm={12}>
        <center>
          <h2 style={{ letterSpacing: '0.1rem', textTransform: 'uppercase', marginTop: '1rem' }}>
            User Choices
          </h2>
        </center>
        <Row></Row>

        <div className={styles.categoryContainer}>
          <h3 className={styles.categoryTitle}>Captain</h3>
          {captain && (
            <div className={styles.selectedPlayer}>
              <Image
                src="https://via.placeholder.com/50"
                alt={captain.name}
                roundedCircle
                className={styles.playerImage}
              />
              {captain.name} (Role: {captain.role}, Points: {captain.points})
            </div>
          )}
        </div>

        <div className={styles.categoryContainer}>
          <h3 className={styles.categoryTitle}>Vice Captain</h3>
          {viceCaptain && (
            <div className={styles.selectedPlayer}>
              <Image
                src="https://via.placeholder.com/50"
                alt={viceCaptain.name}
                roundedCircle
                className={styles.playerImage}
              />
              {viceCaptain.name} (Role: {viceCaptain.role}, Points: {viceCaptain.points})
            </div>
          )}
        </div>

        <div className={styles.categoryContainer}>
          <h3 className={styles.categoryTitle}>Other Players</h3>
          {otherPlayers.map((player) => (
            <div key={player.id} className={styles.selectedPlayer}>
              <Image
                src="https://via.placeholder.com/50"
                alt={player.name}
                roundedCircle
                className={styles.playerImage}
              />
              {player.name} (Role: {player.role}, Points: {player.points})
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default ChoicesScreen;
