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
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setData(results);
      setPlanets(results);
    }
    fetchAPI();
  }, []);

  data.forEach((planet) => delete planet.residents);

  // const filterPlanets = () => {
  //   // console.log(planets);
  //   // console.log(filterByNumericValues);
  //   let filterData = [...data];
  //   if (filterByNumericValues.length) {
  //     filterByNumericValues.forEach((objPlanet) => {
  //       if (objPlanet.comparison === 'maior que') {
  //         filterData = data
  //           .filter((el) => (Number(el[objPlanet.column]) > Number(objPlanet.value)));
  //       } else if (objPlanet.comparison === 'menor que') {
  //         filterData = data
  //           .filter((el) => Number(el[objPlanet.column] < Number(objPlanet.value)));
  //       } else {
  //         filterData = data
  //           .filter((el) => el[objPlanet.column] === objPlanet.value);
  //       }
  //     });
  //     setPlanets(filterData);
  //     return filterData;
  //   } return data;
  // };

  useEffect(() => {
    // if (filterByNumericValues.length) {
    const filterPlanets = () => {
      filterByNumericValues.forEach((objPlanet) => {
        if (objPlanet.comparison === 'maior que') {
          setFilterData(data
            .filter((el) => (Number(el[objPlanet.column]) > Number(objPlanet.value))));
        } if (objPlanet.comparison === 'menor que') {
          setFilterData(data
            .filter((el) => Number(el[objPlanet.column] < Number(objPlanet.value))));
        } if (objPlanet.comparison === 'igual a') {
          setFilterData(data
            .filter((el) => el[objPlanet.column] === objPlanet.value));
        }
      });
    };
    filterPlanets();
    // } return data;
  }, [filterByNumericValues]);

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
        filterData,
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
