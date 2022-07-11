import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(Context);

  const [inputFilter, setInputFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const onClickFilterButton = () => {
    setFilterByNumericValues([...filterByNumericValues, inputFilter]);
  };

  // console.log(inputFilter);
  return (
    <>
      <span>{ console.log(filterByNumericValues) }</span>
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
          onChange={ ({ target }) => setInputFilter({
            ...inputFilter, column: target.value }) }
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
          onChange={ ({ target }) => setInputFilter({
            ...inputFilter, comparison: target.value }) }
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
          onChange={ ({ target }) => setInputFilter({
            ...inputFilter, value: target.value }) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilterButton }
      >
        Filtrar
      </button>
    </>
  );
}

export default Filters;
