import React,{useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import { Image } from 'react-bootstrap';
import styles from './Live.module.css';
import { useLocation } from 'react-router-dom';

const LiveMatchStats = () => {
  const location = useLocation();
  const [matchStats, setMatchStats] = useState([]);
  
  const getmatch = async() => {
    console.log("here is match--> ",location.state?.matchdetail);
    setMatchStats(location.state?.matchdetail[0]);
  }

  useEffect(() => {
    getmatch();
  },[])


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.teamImages}
        >
          <center>
            <h3
            style={{
              marginLeft: "38vw",
            }}
            >
              {
                matchStats.result
              }
            </h3>
          </center>
        </div>
        <p className={styles.currentRuns}>{matchStats?.currentRuns}</p>
      </div>

      <div className={styles.tossStadiumInfo}>
        <p className={styles.toss}>{matchStats?.toss}</p>
        <p className={styles.stadium}>Stadium: {matchStats?.stadium}</p>
      </div>

      <div className={styles.currentPlayers}>
        <p className={styles.currentBattingTeam}>TotalRuns {matchStats?.team1}: {matchStats?.totalRunsTeam1}</p>
        <p className={styles.currentBowlingTeam}>TotalRuns: {matchStats?.team2}: {matchStats?.totalRunsTeam2}</p>
        {/* <p className={styles.currentBatsmanOnStrike}>On Strike: {matchStats?.currentBatsmanOnStrike}</p> */}
        {/* <p className={styles.currentBatsmanOnNonStrike}>Non-Strike: {matchStats?.currentBatsmanOnNonStrike}</p>
        <p className={styles.currentBowler}>Bowler: {matchStats?.currentBowler}</p> */}

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



                <center><h4
        className={styles.matchStatsHeading}
        >Batting Stats of {matchStats?.team2}</h4></center>

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

                <div
                className={styles.extrasAndWickets}
                >    
                    
                <div>
                    
                </div>
                {/* <Table bordered hover className={styles.extrasTable}>
                  <thead>
                    <tr>
                      <th>Extras</th>
                      <th>Byes</th>
                      <th>Wides</th>
                      <th>No Balls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Team 1</td>
                      <td>{matchStats.extrasTeam1?.byes}</td>
                      <td>{matchStats.extrasTeam1?.wides}</td>
                      <td>{matchStats.extrasTeam1?.noBalls}</td>
                    </tr>
           
                  </tbody>
                </Table>

         
          
                <Table bordered hover className={styles.fallOfWicketsTable}>
                  <thead>
                    <tr>
                      <th>Fall of Wickets</th>
                      <th>Wicket</th>
                      <th>Runs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchStats.fallOfWicketsTeam1?.map((wicket, index) => (
                      <tr key={index}>
                        <td>{wicket.playerName}</td>
                        <td>{wicket.wicket}</td>
                        <td>{wicket.runs}</td>
                      </tr>
                    ))}
                 
                  </tbody>
                </Table> */}

                </div>
          
               
              </div>
            );
          };
          
          export default LiveMatchStats;
          
           
