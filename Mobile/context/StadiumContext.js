import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StadiumContext = createContext();

const StadiumProvider = ({ children }) => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://itsstageproject.000webhostapp.com/api/stades')
      .then((res) => {
        setStadiums(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <StadiumContext.Provider
      value={{
        stadiums,
        loading,
        error,
      }}
    >
      {children}
    </StadiumContext.Provider>
  );
};

export default StadiumProvider;
