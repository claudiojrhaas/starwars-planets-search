import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    planets, filterByName, filterByNumericValues,
  } = useContext(Context);

  // const filterPlanets = (data) => {
  //   if (filterByNumericValues.length) {
  //     const filter =
  //   }
  // };

  const filterPlanets = (data) => {
    if (filterByNumericValues.length) {
      console.log(filterByNumericValues);

      //     filterByNumericValues.forEach((objPlanet) => {
      //       data.filter((el) => {
      //         console.log(objPlanet);
      //         switch (objPlanet.comparison) {
      //         case 'maior que':
      //           return Number(el[objPlanet.column] > Number(objPlanet.value));
      //         case 'menor que':
      //           return Number(el[objPlanet.column] < Number(objPlanet.value));
      //         case 'igual a':
      //           return Number(el[objPlanet.column] === Number(objPlanet.value));
      //         default: return data;
      //         }
      //       });
      //     });
      //   } return data;
      // };
      const objPlanet = filterByNumericValues[0];
      // filterByNumericValues.forEach((objPlanet) => {
      console.log(typeof objPlanet.value);
      if (objPlanet.comparison === 'maior que') {
        return data
          .filter((el) => Number(el[objPlanet.column] > Number(objPlanet.value)));
      } if (objPlanet.comparison === 'igual a') {
        return data
          .filter((el) => Number(el[objPlanet.column] === Number(objPlanet.value)));
      } if (objPlanet.comparison === 'menor que') {
        return data
          .filter((el) => Number(el[objPlanet.column] < Number(objPlanet.value)));
        // .filter((el) => console.log(
        //   Number(el[objPlanet.column]), Number(objPlanet.value),
        // ));
      }
      // });
    } return data;
  };

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

  );
}

export default Table;
