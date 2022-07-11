import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { planets, filterByName, setFilterByName } = useContext(Context);
  // const reg = /filterByName/i;
  // console.log(tableHeaders);
  // console.log(planets);

  return (
    <>
      <label htmlFor='nameFilter'>
        { console.log(filterByName) }
        <input
          id='nameFilter'
          name='nameFilter'
          type='text'
          data-testid='name-filter'
          placeholder='Digite o planeta'
          value={ filterByName.name }
          onChange={ ({ target }) => setFilterByName(target.value) }
        />
      </label>
      <table>
        <thead>
          <tr>
            {/* {
              tableHeaders.map((el, index) => (
                <th key={ index }>{ el }</th>
                ))
              } */}
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
            planets
            .filter((el) => el.name.includes(filterByName))
            .map((planet, index) => (
              <tr key={ index }>
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
    </>
  );
}

export default Table;
