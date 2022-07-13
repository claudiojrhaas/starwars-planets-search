import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [columnOptions, setColumnOptions] = useState(['population', 'diameter',
    'orbital_period', 'rotation_period', 'surface_water']);
  const [comparisonOptions, setComparisonOptions] = useState(['maior que',
    'menor que', 'igual a']);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanets(results);
    }
    fetchAPI();
  }, []);

  planets.forEach((planet) => delete planet.residents);

  return (
    <Context.Provider
      value={ {
        planets,
        filterByName,
        setFilterByName,
        filterByNumericValues,
        setFilterByNumericValues,
        columnOptions,
        comparisonOptions,
        setData,
        data,
        setPlanets,
        setColumnOptions,
        setComparisonOptions,
      } }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Provider;
