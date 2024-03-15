import React, { useEffect, useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import styles from './Selection.module.css';
import { auth } from '../../config/firebase';
import { MatchContext } from '../../Context/MatchContext';
import ip from '../../config/Ip';
import axios from 'axios';

const ChoicesScreen = () => {

  const [captain, setCaptain] = useState();
  const [viceCaptain, setViceCaptain] = useState();
  const [otherPlayers, setOtherPlayers] = useState([]);

  const { matchid, setMatchid, inningsid, setInningsid, squaddetail, setSquaddetail, getMatchById, getPlayerList, getmatchid } = useContext(MatchContext);
  const [selected, setSelected] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
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
  const isSelected = async () => {
    try {
      const response = await axios.get(`${ip}/getSelected/${auth.currentUser.uid}/${matchid}`);
      return response.data.isSelected;
    }
    catch (err) {
      console.log(err);
    }
  }

  const getSelected = async () => {
    try {
      if (isSelected) {
        const response = await axios.get(`${ip}/getSelected/${auth.currentUser.uid}/${matchid}`);
        // selectedPlayers=response.data.data[0].selection;
        // console.log(response)
        setSelectedPlayers(response.data.data[0].selection);

        setCaptain(response.data.data[0].selection.find((player) => player.playerRole === 'captain'));
        setViceCaptain(response.data.data[0].selection.find((player) => player.playerRole === 'viceCaptain'));
        setOtherPlayers(response.data.data[0].selection.filter((player) => player.playerRole === 'player'));
        setSelected(true);

        // console.log(otherPlayers);
      }
      else {
        setSelected(false);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchSelectedData = async () => {
      try {
        const response = await axios.get(`${ip}/getSelected/${auth.currentUser.uid}/${matchid}`);
        const isSelected = response.data.isSelected;
        if (isSelected) {
          setSelectedPlayers(response.data.data[0].selection);
          setCaptain(response.data.data[0].selection.find((player) => player.playerRole === 'captain'));
          setViceCaptain(response.data.data[0].selection.find((player) => player.playerRole === 'viceCaptain'));
          setOtherPlayers(response.data.data[0].selection.filter((player) => player.playerRole === 'player'));
          setSelected(true);
        } else {
          setSelected(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSelectedData();
  }, [matchid]);
  return (
    <Row className={styles.choicesScreenContainer}
      style={{
        marginTop: "2rem",
        minHeight: "100vh"
      }}
    >
      {
        selected === false ?
          <div>
            <center>
              <h2 style={{ letterSpacing: '0.1rem', textTransform: 'uppercase', marginTop: '1rem', fontWeight: "bold" }}>
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
                  <Image
                    src={
                      captain.image_url
                    }
                    alt={captain.name}
                    roundedCircle
                    className={styles.playerImage}
                  />
                  {captain.name} (Role: Captain, Points: {captain.points})
                </div>
              )}
            </div>

            <div className={styles.categoryContainer}>
              <h3 className={styles.categoryTitle}>Vice Captain</h3>
              {viceCaptain && (
                <div className={styles.selectedPlayer}>
                  <Image
                    src={
                      viceCaptain.image_url
                    }
                    alt={viceCaptain.name}
                    roundedCircle
                    className={styles.playerImage}
                  />
                  {viceCaptain.name} (Role: Vice Captain, Points: {viceCaptain.points})
                </div>
              )}
            </div>

            <div className={styles.categoryContainer}>
              <h3 className={styles.categoryTitle}>Other Players</h3>
              {otherPlayers.map((player) => (
                <div key={player.id} className={styles.selectedPlayer}>
                  <Image
                    src={
                      player.image_url
                    }
                    alt={player.name}
                    roundedCircle
                    className={styles.playerImage}
                  />
                  {player.name} (Role: Player, Points: {player.points})
                </div>
              ))}
            </div>
          </Col>
      }
      <br/>
    </Row>
  );
};

export default ChoicesScreen;
