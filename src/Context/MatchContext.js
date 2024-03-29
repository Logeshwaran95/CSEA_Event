import React, { createContext, useContext, useState } from 'react';

// Create a context
export const MatchContext = createContext();

export const MatchContextProvider = ({ children }) => {

  const [matchid, setMatchid] = useState(0);
  const [squaddetail,setSquaddetail] = useState([]);

  return (
    <MatchContext.Provider value={{ matchid, setMatchid,squaddetail,setSquaddetail }}>
      {children}
    </MatchContext.Provider>
  );
};
