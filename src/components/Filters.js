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

  const COLUMN_OPTIONS = ['population', 'diameter', 'orbital_period',
    'rotation_period', 'surface_water'];
  const COMPARISON_OPTIONS = ['maior que', 'menor que', 'igual a'];

  const onClickFilterButton = () => {
    setFilterByNumericValues([...filterByNumericValues, inputFilter]);
  };

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
          value={ inputFilter.column }
          onChange={ ({ target }) => setInputFilter({
            ...inputFilter, column: target.value }) }
        >
          {
            COLUMN_OPTIONS.map((option, i) => (
              <option key={ i } value={ option }>{ option }</option>
            ))
          }
        </select>
      </label>

      <label htmlFor="comparisonFilter">
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          value={ inputFilter.comparison }
          onChange={ ({ target }) => setInputFilter({
            ...inputFilter, comparison: target.value }) }
        >
          {
            COMPARISON_OPTIONS.map((option, i) => (
              <option key={ i } value={ option }>{ option }</option>
            ))
          }
        </select>
      </label>

      <label htmlFor="valueFilter">
        <input
          name="valueFilter"
          id="valueFilter"
          type="number"
          placeholder="Valor"
          data-testid="value-filter"
          value={ inputFilter.value }
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
