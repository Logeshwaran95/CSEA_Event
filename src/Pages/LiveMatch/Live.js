import React,{useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import { Image } from 'react-bootstrap';
import styles from './Live.module.css';
import { useLocation } from 'react-router-dom';

const LiveMatchStats = () => {
  const location = useLocation();
  const [matchStats, setMatchStats] = useState([]);
  // alert(location.state?.matchdetail);
  
  const getmatch = async() => {
    console.log("here is match--> ",location.state?.matchdetail);
    setMatchStats(location.state?.matchdetail[0]);
  }

  useEffect(() => {
    getmatch();
  },[])

  // const matchStats = {
  //   team1: 'India',
  //   team2: 'Australia',
  //   toss: 'India won the toss and elected to bat',
  //   stadium: 'MCG, Melbourne',
  //   currentRuns: '142/2 (Overs: 18.4)',
  //   currentBattingTeam: "India",
  //   currentBowlingTeam: "Australia",
  //   currentBatsmanOnStrike: 'Rohit Sharma',
  //   currentBatsmanOnNonStrike: 'Virat Kohli',
  //   currentBowler: 'Pat Cummins',
  //   battingTeam1: [
  //     { player: 'Rohit Sharma', runs: 50, balls: 35, fours: 6, sixes: 2, strikeRate: 142.85 },
  //     { player: 'Virat Kohli', runs: 42, balls: 30, fours: 3, sixes: 1, strikeRate: 140.00 },
  //     { player: 'Shikhar Dhawan', runs: 28, balls: 20, fours: 4, sixes: 0, strikeRate: 140.00 },
  //     { player: 'KL Rahul', runs: 35, balls: 28, fours: 2, sixes: 0, strikeRate: 125.00 },
  //   ],
  //   battingTeam2: [
  //     { player: 'David Warner', runs: 25, balls: 20, fours: 4, sixes: 0, strikeRate: 125.00 },
  //     { player: 'Steve Smith', runs: 32, balls: 28, fours: 2, sixes: 0, strikeRate: 114.29 },
  //     { player: 'Aaron Finch', runs: 18, balls: 15, fours: 1, sixes: 1, strikeRate: 120.00 },
  //     { player: 'Glenn Maxwell', runs: 21, balls: 18, fours: 1, sixes: 2, strikeRate: 116.67 },
  //   ],
  //   extrasTeam1: {
  //     byes: 4,
  //     wides: 2,
  //     noBalls: 1,
  //   },
  //   extrasTeam2: {
  //     byes: 3,
  //     wides: 1,
  //     noBalls: 2,
  //   },
  //   totalRunsTeam1: 212,
  //   totalRunsTeam2: 96,
  //   fallOfWicketsTeam1: [
  //     { playerName: "name 1",wicket: 1, runs: 90 },
  //     { playerName: "name 2",wicket: 2, runs: 120 },
  //   ],
  //   fallOfWicketsTeam2: [
  //     { wicket: 1, runs: 40 },
  //     { wicket: 2, runs: 80 },
  //   ],
  //   bowlingTeam1: [
  //     { player: 'Jasprit Bumrah', overs: 4, maidens: 1, runs: 28, wickets: 2, economy: 7.00 },
  //     { player: 'Yuzvendra Chahal', overs: 4, maidens: 0, runs: 40, wickets: 1, economy: 10.00 },
  //     { player: 'Hardik Pandya', overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
  //   ],
  //   bowlingTeam2: [
  //     { player: 'Pat Cummins', overs: 4, maidens: 0, runs: 35, wickets: 0, economy: 8.75 },
  //     { player: 'Mitchell Starc', overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 },
  //     { player: 'Adam Zampa', overs: 4, maidens: 0, runs: 30, wickets: 2, economy: 7.50 },
  //   ],
  // };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.teamImages}>
          <Image src="https://media.istockphoto.com/id/472317739/vector/flag-of-india.jpg?s=612x612&w=0&k=20&c=ejlQRX4C_Mb40wz1JQcB5vKYcOKlfRtry2W6UcX6mlo=" alt={matchStats.team1} className={styles.teamImage} />
          <span className={styles.vs}>vs</span>
          <Image src="https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg" alt={matchStats.team2} className={styles.teamImage} />
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
        <p className={styles.currentBatsmanOnStrike}>On Strike: {matchStats?.currentBatsmanOnStrike}</p>
        <p className={styles.currentBatsmanOnNonStrike}>Non-Strike: {matchStats?.currentBatsmanOnNonStrike}</p>
        <p className={styles.currentBowler}>Bowler: {matchStats?.currentBowler}</p>
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
          
           
