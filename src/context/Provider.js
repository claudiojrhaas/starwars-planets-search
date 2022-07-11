import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  // const [state, setState] = useState({
  //   filterByName: {
  //     name: '',
  //   }
  // });

  useEffect(() => {
    async function fetchAPI() {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanets(results);
    }
    fetchAPI();
  }, []);

  planets.forEach((planet) => delete planet.residents);

  // function handleChange({ target }) {
  //   setState({
  //     ...state,
  //     filterByName: {
  //       name: target.value,
  //     }
  //   })
  // }

  return (
    <Context.Provider value={ { planets, filterByName, setFilterByName } }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
