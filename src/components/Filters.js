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
  } = useContext(Context);

  // const [inputFilter, setInputFilter] = useState({
  //   column: 'population',
  //   comparison: 'maior que',
  //   value: 0,
  // });

  const [inputColumn, setInputColumn] = useState('population');
  const [inputComparison, setInputComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);

  const removeColumnOption = () => {
    const filterColumn = columnOptions.filter((i) => (inputColumn !== i));
    filterColumn.reverse();
    console.log(filterColumn);
    setColumnOptions(filterColumn);
  };

  // const onClickFilterButton = () => {
  //   console.log(inputColumn, inputComparison, inputValue);
  //   removeColumnOption();
  //   // setInputFilter({
  //   //   ...inputFilter, id: inputFilter.id + 1 });
  //   // setFilterByNumericValues(
  //   //   [...filterByNumericValues, inputFilter],
  //   // );
  //   setFilterByNumericValues((prev) => (
  //     [...prev, { column: inputColumn, comparison: inputComparison, value: inputValue }]
  //   ));
  //   console.log(filterByNumericValues);
  // };

  const onClickFilterButton = () => {
    removeColumnOption();
    setFilterByNumericValues((prev) => (
      [...prev, { column: inputColumn, comparison: inputComparison, value: inputValue }]
    ));
    setInputColumn(columnOptions[0]);
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
          onChange={ ({ target }) => setInputColumn(target.value) }
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
      {
        filterByNumericValues.map((el, i) => (
          <div key={ i }>
            { `${el.column} ${el.comparison} ${el.value}` }
          </div>
        ))
      }
    </>
  );
}

export default Filters;
