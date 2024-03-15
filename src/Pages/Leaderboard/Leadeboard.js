import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import ip from '../../config/Ip';
import { Tab, Tabs } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 50; // Adjust as needed

  const getData = async () => {
    try {
      const response = await axios.get(`${ip}/leaderboard`);
      setLeaderboardData(response.data.data);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = leaderboardData
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user, key) => (
      <tr key={key}>
        <td>{pagesVisited + key + 1}</td>
        <td>{user.name}</td>
        <td>{user.score}</td>
      </tr>
    ));

  const pageCount = Math.ceil(leaderboardData.length / usersPerPage);

  const changePage = (selected) => {
    setPageNumber(selected);
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <center>
        <h2
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.1rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
          }}
        >
          Leaderboard
        </h2>
      </center>
      {
        leaderboardData.length != 0 ? <Tabs defaultActiveKey="page1" id="pagination-tabs">
        {[...Array(pageCount).keys()].map((index) => (
          <Tab eventKey={`page${index + 1}`} title={`Page ${index + 1}`} key={index}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>{displayUsers}</tbody>
            </Table>
          </Tab>
        ))}
      </Tabs>
      :
      <center>
        <h2
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.1rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
          }}
        >
          No Data Available
        </h2>
      </center>
      }
    </div>
    // <div style={{ marginTop: '6rem' }}>
    //   <center>
    //     <h2
    //       style={{
    //         textTransform: 'uppercase',
    //         letterSpacing: '0.1rem',
    //         fontWeight: 'bold',
    //         marginBottom: '2rem',
    //       }}
    //     >
    //       Leaderboard will be available after the match starts 
    //     </h2>
    //     <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    //   </center>
    // </div>
  );
};

export default Leaderboard;
