import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { Image } from 'react-bootstrap';
import styles from './Live.module.css';
import { useLocation } from 'react-router-dom';
import { MatchContext } from '../../Context/MatchContext';

const LiveMatchStats = () => {
  const location = useLocation();
  const [matchStats, setMatchStats] = useState([]);
  const { matchid, inningsid } = useContext(MatchContext);
  const getmatch = async () => {
    console.log("here is match--> ", location.state?.matchdetail);
    setMatchStats(location.state?.matchdetail[0]);
  }

  useEffect(() => {
    getmatch();
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.header}>
          <p className={styles.currentRuns}>Match {matchid} {matchStats?.team1?.toUpperCase()} vs {matchStats?.team2?.toUpperCase()}</p>
      </div>

      <div className={styles.tossStadiumInfo}>
        <p className={styles.stadium}><strong>Stadium: </strong> {matchStats?.stadium}</p>
        <i><p className={styles.toss}>{matchStats?.toss}</p></i>
      </div>
      <div className={styles.card}>
        <div className={styles.currentPlayers}>
          <p className={styles.currentBattingTeam}><strong>{matchStats?.team1}:</strong>  {matchStats?.totalRunsTeam1}</p>
          {inningsid === 1 &&
            <p className={styles.currentBowlingTeam}><strong>{matchStats?.team2}:</strong> Yet to bat</p>
          }
          {inningsid === 2 &&
            <p className={styles.currentBowlingTeam}>
              <strong>{matchStats?.team2}:</strong> {matchStats?.totalRunsTeam2}
            </p>
          }
        </div>
        {inningsid === 2 &&
          <p className={styles.result}>
            <center>
              <h5>{matchStats.result}</h5>
            </center>
          </p>
        }
      </div>


      <center><h4
        className={styles.matchStatsHeading}
      >Batting Stats of {matchStats?.team1}</h4></center>

      <Table bordered hover className={styles.battingTable}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Runs</th>
            <th>Balls</th>
            <th>4s</th>
            <th>6s</th>
            <th>Strike Rate</th>
          </tr>
        </thead>
        <tbody>
          {matchStats.battingTeam1?.map((player, index) => (
            <tr key={index}>
              <td>{player.player}</td>
              <td>{player.runs}</td>
              <td>{player.balls}</td>
              <td>{player.fours}</td>
              <td>{player.sixes}</td>
              <td>{player.strikeRate}</td>
            </tr>
          ))}
        </tbody>
      </Table>


      <center><h4
        className={styles.matchStatsHeading}
      >Bowling Stats of {matchStats?.team2}</h4></center>

      <Table bordered hover className={styles.bowlingTable}>
        <thead>
          <tr>
            <th>Bowler</th>
            <th>Overs</th>
            <th>Maidens</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Economy</th>
          </tr>
        </thead>
        <tbody>
          {matchStats.bowlingTeam1?.map((bowler, index) => (
            <tr key={index}>
              <td>{bowler.player}</td>
              <td>{bowler.overs}</td>
              <td>{bowler.maidens}</td>
              <td>{bowler.runs_}</td>
              <td>{bowler.wickets}</td>
              <td>{bowler.economy}</td>
            </tr>
          ))}
        </tbody>
      </Table>


      {inningsid === 2 && <>
        <center>
          <h4 className={styles.matchStatsHeading}>Batting Stats of {matchStats?.team2}</h4></center>

        <Table bordered hover className={styles.battingTable}>
          <thead>
            <tr>
              <th>Player</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
              <th>Strike Rate</th>
            </tr>
          </thead>
          <tbody>
            {matchStats.battingTeam2?.map((player, index) => (
              <tr key={index}>
                <td>{player.player}</td>
                <td>{player.runs}</td>
                <td>{player.balls}</td>
                <td>{player.fours}</td>
                <td>{player.sixes}</td>
                <td>{player.strikeRate}</td>
              </tr>
            ))}
          </tbody>
        </Table>


        <center><h4
          className={styles.matchStatsHeading}
        >Bowling Stats of {matchStats?.team1}</h4></center>

        <Table bordered hover className={styles.bowlingTable}>
          <thead>
            <tr>
              <th>Bowler</th>
              <th>Overs</th>
              <th>Maidens</th>
              <th>Runs</th>
              <th>Wickets</th>
              <th>Economy</th>
            </tr>
          </thead>
          <tbody>
            {matchStats.bowlingTeam2?.map((bowler, index) => (
              <tr key={index}>
                <td>{bowler.player}</td>
                <td>{bowler.overs}</td>
                <td>{bowler.maidens}</td>
                <td>{bowler.runs_}</td>
                <td>{bowler.wickets}</td>
                <td>{bowler.economy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>}
    </div>
  );
};

export default LiveMatchStats;


