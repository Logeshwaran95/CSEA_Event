import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import ip from '../config/Ip';
// Create a context
export const MatchContext = createContext();

export const MatchContextProvider = ({ children }) => {

  const [matchid, setMatchid] = useState(-1);
  const [inningsid, setInningsid] = useState(-1);
  const [squaddetail, setSquaddetail] = useState([]);
  const [matchdetail, setMatchdetail] = useState({});
  const getMatchById = async (id, inningsid) => {
    try {
      const response2 = await axios.get(`${ip}/getmatch/${id}/${inningsid}`);
      setMatchdetail(response2.data.data);
      return response2;
    } catch (err) {
      console.log(err);
      alert(err);
      return err;
    }
  }
  const getPlayerList = async (id, inningsid) => {
    try {
      const response4 = await axios.get(`${ip}/getPlayerList/${id}/${inningsid}`);
      const squad = response4.data.data;
      setSquaddetail(squad)
      return;
    } catch (err) {
      console.log(err);
      alert(err);
      return err;
    }
  }
  const getmatchid = async () => {
    try {
      const response = await axios.get(`${ip}/getmatchid`);
      setMatchid(response.data.data[0].id);
      setInningsid(response.data.data[0].inningsid)
      return {matchid: response.data.data[0].id, inningsid: response.data.data[0].inningsid}
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return (
    <MatchContext.Provider value={{ matchid, setMatchid, inningsid, setInningsid, squaddetail, setSquaddetail, getmatchid, getPlayerList, getMatchById, matchdetail }}>
      {children}
    </MatchContext.Provider>
  );
};
