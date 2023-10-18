import React from 'react';
import { Container, Table } from 'react-bootstrap';

const Dream11ScoringSystem = () => {
  return (
    <Container
    style={{
        marginTop:"6rem"
    }}
    >
      <h2>CSEA Fantasy League Scoring System</h2>

      {/* Batting Points */}
      <h4>Batting Points</h4>
      <Table striped bordered hover>
        
        <thead>
          <tr>
            <th>Event</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>For each run</td>
            <td>+1</td>
          </tr>
          <tr>
            <td>For each boundary</td>
            <td>+1</td>
          </tr>
          <tr>
            <td>For each six</td>
            <td>+2</td>
          </tr>
          <tr>
            <td>For a half-century (50 runs)</td>
            <td>+4</td>
          </tr>
          <tr>
            <td>For a century (100 runs)</td>
            <td>+8</td>
          </tr>
          <tr>
            <td>Dismissal for a duck (Batter, Wicket-Keeper & All-Rounder)</td>
            <td>-3</td>
          </tr>
        </tbody>
      </Table>

      {/* Bowling Points */}
      <h4>Bowling Points</h4>
      <Table striped bordered hover>
        
        <thead>
          <tr>
            <th>Event</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>For each wicket taken (excluding run-outs)</td>
            <td>+25</td>
          </tr>
          <tr>
            <td>Bonus for a 4-wicket haul</td>
            <td>+8</td>
          </tr>
          <tr>
            <td>Bonus for a 5-wicket haul</td>
            <td>+16</td>
          </tr>
          <tr>
            <td>Maiden over</td>
            <td>+4</td>
          </tr>
        </tbody>
      </Table>

      {/* Economy Rate Points */}
      <h4>Economy Rate Points</h4>
      <Table striped bordered hover>
       
        <thead>
          <tr>
            <th>Event</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Below 2.5 runs per over</td>
            <td>+6</td>
          </tr>
          <tr>
            <td>Between 2.5 - 3.49 runs per over</td>
            <td>+4</td>
          </tr>
          <tr>
            <td>Between 3.5 - 4.5 runs per over</td>
            <td>+2</td>
          </tr>
          <tr>
            <td>Between 7 - 8 runs per over</td>
            <td>-2</td>
          </tr>
          <tr>
            <td>Between 8.01 - 9 runs per over</td>
            <td>-4</td>
          </tr>
          <tr>
            <td>Above 9 runs per over</td>
            <td>-6</td>
          </tr>
        </tbody>
      </Table>

      {/* Strike Rate Points */}
      <h4>Strike Rate Points</h4>
      <Table striped bordered hover>
        
        <thead>
          <tr>
            <th>Event</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Above 140 runs per 100 balls</td>
            <td>+6</td>
          </tr>
          <tr>
            <td>Between 120.01-140 runs per 100 balls</td>
            <td>+4</td>
          </tr>
          <tr>
            <td>Between 100-120 runs per 100 balls</td>
            <td>+2</td>
          </tr>
          <tr>
            <td>Between 40-50 runs per 100 balls</td>
            <td>-2</td>
          </tr>
          <tr>
            <td>Between 30-39.99 runs per 100 balls</td>
            <td>-4</td>
          </tr>
          <tr>
            <td>Below 30 runs per 100 balls</td>
            <td>-6</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Dream11ScoringSystem;
