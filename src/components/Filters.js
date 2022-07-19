import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    columnOptions,
    comparisonOptions,
    setColumnOptions,
    // setPlanets,
    // planets,
  } = useContext(Context);

  const [inputColumn, setInputColumn] = useState('population');
  const [inputComparison, setInputComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);
  const [inputId, setInputId] = useState(0);

  const removeColumnOption = () => {
    const filterColumn = columnOptions.filter((i) => (inputColumn !== i));
    setColumnOptions(filterColumn);
  };

  const onClickFilterButton = () => {
    removeColumnOption();
    setInputId(inputId + 1);
    setFilterByNumericValues((prev) => (
      [...prev, {
        column: inputColumn,
        comparison: inputComparison,
        value: inputValue,
        id: inputId,
      }]
    ));
    setInputColumn(columnOptions[0]);
  };

  const onClickDeleteSingleValue = (id, column) => {
    const filterArr = filterByNumericValues.filter((el) => el.id !== id);
    setFilterByNumericValues(filterArr);
    const newColumnOptions = columnOptions.concat(column);
    // console.log(newColumnOptions);
    setColumnOptions(newColumnOptions);
  };

  const onClickDeleteAllValues = () => {
    setFilterByNumericValues([]);
    setColumnOptions(['population', 'diameter',
      'orbital_period', 'rotation_period', 'surface_water']);
    // setPlanets(planets);
  };

  const onChangeColumnFilter = (target) => {
    setInputColumn(columnOptions[0]);
    setInputColumn(target.value);
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
          value={ inputColumn }
          onChange={ ({ target }) => onChangeColumnFilter(target) }
        >
          {
            columnOptions.map((option, i) => (
              <option key={ i }>{ option }</option>
            ))
          }
        </select>
      </label>

      <label htmlFor="comparisonFilter">
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          value={ inputComparison }
          onChange={ ({ target }) => setInputComparison(target.value) }
        >
          {
            comparisonOptions.map((option, i) => (
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
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilterButton }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ onClickDeleteAllValues }
      >
        Remover todas filtragens
      </button>
      {
        filterByNumericValues.map((el) => (
          <div key={ el.id }>
            <span data-testid="filter">
              { el.column }
              {' '}
              { el.comparison }
              {' '}
              { el.value }
              {' '}
              <button
                type="button"
                onClick={ () => onClickDeleteSingleValue(el.id, el.column) }
              >
                X
              </button>
            </span>
          </div>
        ))
      }
    </>
  );
}

export default Filters;
