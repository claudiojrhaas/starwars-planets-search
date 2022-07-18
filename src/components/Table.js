import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    planets,
    filterByName,
    filterByNumericValues,
    setPlanets,
  } = useContext(Context);

  const filterPlanets = (dataPlanets) => {
    // console.log(planets);
    // console.log(filterByNumericValues);
    let filterData = dataPlanets;
    if (filterByNumericValues.length) {
      filterByNumericValues.forEach((objPlanet) => {
        if (objPlanet.comparison === 'maior que') {
          filterData = dataPlanets
            .filter((el) => (Number(el[objPlanet.column]) > Number(objPlanet.value)));
        } else if (objPlanet.comparison === 'menor que') {
          filterData = dataPlanets
            .filter((el) => Number(el[objPlanet.column] < Number(objPlanet.value)));
        } else {
          filterData = dataPlanets
            .filter((el) => el[objPlanet.column] === objPlanet.value);
        }
      });
      setPlanets(filterData);
      return filterData;
    } return dataPlanets;
  };

  useEffect(() => {
    setPlanets(planets);
    // filterPlanets(planets);
    // console.log(planets);
  }, [setPlanets, planets]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          filterPlanets(planets)
            .filter((el) => el.name.includes(filterByName.name))
            .map((planet, i) => (
              <tr key={ i }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
        }
      </tbody>
    </table>

  );
}

export default Table;
