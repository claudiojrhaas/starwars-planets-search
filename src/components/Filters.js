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

  const [inputFilter, setInputFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  // useEffect(() => {
  //   setColumnOptions(columnOptions);
  // }, [setColumnOptions, filterByNumericValues, columnOptions]);

  const removeColumnOption = () => {
    // const UM = -1;
    const a = columnOptions.filter((i) => (filterByNumericValues
      .find((el) => (i !== el.column))));
    console.log(a);
    setColumnOptions(a);
    // if (index !== UM && columnOptions.splice(index, 1));
    // console.log(columnOptions);
  };

  const onClickFilterButton = () => {
    removeColumnOption();
    // setInputFilter({
    //   ...inputFilter, id: inputFilter.id + 1 });
    setFilterByNumericValues(
      [...filterByNumericValues, inputFilter],
    );
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
            columnOptions.map((option, i) => (
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
