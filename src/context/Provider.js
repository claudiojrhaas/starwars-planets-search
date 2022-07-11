import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    async function fetchAPI() {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanets(results);
      setTableHeaders(Object.keys(results[0]));
    }
    fetchAPI();
  }, []);

  planets.forEach((planet) => delete planet.residents);

  return (
    <Context.Provider value={ { planets, tableHeaders, filterByName, setFilterByName } }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default Provider;
