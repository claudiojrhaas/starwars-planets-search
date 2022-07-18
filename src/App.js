import React from 'react';
import './App.css';
import InputFilters from './components/InputFilters';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <InputFilters />
      <Table />
    </Provider>
  );
}

export default App;
