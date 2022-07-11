import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(Context);

  return (
    <>
      <label htmlFor="nameFilter">
        <input
          id="nameFilter"
          name="nameFilter"
          type="search"
          data-testid="name-filter"
          placeholder="Digite o planeta"
          value={ filterByName.name }
          onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        />
      </label>
      <label htmlFor="columnFilter">
        <select
          name="columnFilter"
          id="columnFilter"
          data-testid="column-filter"
          value={ filterByNumericValues.column }
          onChange={ ({ target }) => (
            setFilterByNumericValues([{
              ...filterByNumericValues, column: target.value }])) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          value={ filterByNumericValues.comparison }
          onChange={ ({ target }) => (
            setFilterByNumericValues([{
              ...state, comparison: target.value }])) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        <input
          name="valueFilter"
          id="valueFilter"
          type="number"
          placeholder="Valor"
          data-testid="value-filter"
          value={ filterByNumericValues.value }
          onChange={ ({ target }) => (
            setFilterByNumericValues({
              ...filterByNumericValues, value: target.value })) }
        />
      </label>
    </>
  );
}

export default Filters;
