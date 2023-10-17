import React, { useEffect,useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import styles from './Selection.module.css';
import { auth } from '../../config/firebase';
import ip from '../../config/Ip';
import axios from 'axios';

const ChoicesScreen = () => {

  const [captain, setCaptain] = useState();
  const [viceCaptain, setViceCaptain] = useState();
  const [otherPlayers, setOtherPlayers] = useState([]);


  const [selected, setSelected] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const isSelected = async () => {
    try{
      const response = await axios.get(`${ip}/getselected/${auth.currentUser.uid}`);
      return response.data.isSelected;
    }
    catch(err){
      console.log(err);
    }
  }

  const getSelected = async () => {
    try{
        if(isSelected){
          const response = await axios.get(`${ip}/getselection/${auth.currentUser.uid}`);
          // selectedPlayers=response.data.data[0].selection;
          setSelectedPlayers(response.data.data[0].selection);
          
          setCaptain(response.data.data[0].selection.find((player) => player.playerRole === 'captain'));
          setViceCaptain(response.data.data[0].selection.find((player) => player.playerRole === 'viceCaptain'));
          setOtherPlayers(response.data.data[0].selection.filter((player) => player.playerRole === 'player'));
          setSelected(true);

          console.log(response.data.data[0].selection);
        }
        else{
          setSelected(false);
        }

    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getSelected();
  },[])


  return (
    <Row className={styles.choicesScreenContainer}
    style={{
        marginTop:"4rem"
    }}
    >
     {
      selected === false ? 
      <div>
            <center>
        <h2 style={{ letterSpacing: '0.1rem', textTransform: 'uppercase', marginTop: '1rem',fontWeight:"bold" }}>
          You have Not made any Selection
        </h2>
      </center>
      </div>
      :
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
            {/* <Image
              src="https://via.placeholder.com/50"
              alt={captain.name}
              roundedCircle
              className={styles.playerImage}
            /> */}
            {captain.name} (Role: {captain.role}, Points: {captain.points})
          </div>
        )}
      </div>

      <div className={styles.categoryContainer}>
        <h3 className={styles.categoryTitle}>Vice Captain</h3>
        {viceCaptain && (
          <div className={styles.selectedPlayer}>
            {/* <Image
              src="https://via.placeholder.com/50"
              alt={viceCaptain.name}
              roundedCircle
              className={styles.playerImage}
            /> */}
            {viceCaptain.name} (Role: {viceCaptain.role}, Points: {viceCaptain.points})
          </div>
        )}
      </div>

      <div className={styles.categoryContainer}>
        <h3 className={styles.categoryTitle}>Other Players</h3>
        {otherPlayers.map((player) => (
          <div key={player.id} className={styles.selectedPlayer}>
            {/* <Image
              src="https://via.placeholder.com/50"
              alt={player.name}
              roundedCircle
              className={styles.playerImage}
            /> */}
            {player.name} (Role: {player.role}, Points: {player.points})
          </div>
        ))}
      </div>
    </Col>
     }
    </Row>
  );
};

export default ChoicesScreen;
