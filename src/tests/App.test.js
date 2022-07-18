import React from 'react';
import { getByLabelText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

const HEADERS_TABLE = ['Name', 'Rotation Period',	'Orbital Period',	'Diameter',	'Climate',	'Gravity',	'Terrain',	'Surface Water',	'Population',	'Films',	'Created',	'Edited',	'URL'];
const { results } = testData;

describe('Testa o Componente App.js', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Testa se o fetch é realizado corretamente', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled()
  })

  it('Verifica se a tabela é exibida corretamente', async () => {
    render(<App />);
    expect(await screen.findByRole('table', '', {timeout: 5000})).toBeInTheDocument();
    HEADERS_TABLE.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    results.forEach((data) => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
    });
    const rows = document.getElementsByTagName('tr');
    expect(rows).toHaveLength(11);
  })


  it('Verifica se é possível pesquisar pelo planeta digitado', async () => {
    render(<App />);
    const rows = document.getElementsByTagName('tr');
    const btnFilter = screen.getByRole('button',
    { name: /filtrar/i })
    expect(btnFilter).toBeDefined();
    const searchbox = screen.getByRole('searchbox');
    expect(searchbox).toBeInTheDocument();
    userEvent.type(searchbox, 'Tatooine');
    userEvent.click(btnFilter);
    await waitFor(() => {
      expect(rows).toHaveLength(2)
      expect(searchbox).toHaveProperty('value', 'Tatooine')
    }) 
  })
  
  it('Verifica se os filtros são feitos e removidos', async () => {
    render(<App />);
    const btnFilter = screen.getByRole('button',
    { name: /filtrar/i })
    expect(btnFilter).toBeDefined();
    const valueInput = screen.getByRole('spinbutton');
    expect(valueInput).toBeDefined();
    const comparisonInput = screen.getByTestId('comparison-filter')
    expect(comparisonInput).toBeDefined();
    const columnInput = screen.getByTestId('column-filter')
    expect(columnInput).toBeDefined();
    userEvent.type(comparisonInput, 'maior que');
    userEvent.type(columnInput, 'population');
    userEvent.type(valueInput, '4000000000');
    userEvent.click(btnFilter);
    const filterDiv = screen.getByTestId('filter')
    expect(filterDiv).toBeDefined();

    expect(document.getElementsByTagName('tr')).toHaveLength(1);
    
    const removeFilter = screen.getByRole('button',
    { name: /x/i });
    expect(removeFilter).toBeInTheDocument();
    userEvent.click(removeFilter);
    expect(filterDiv).not.toBeInTheDocument();
    expect(removeFilter).not.toBeInTheDocument();
    })
    
    it('editar depois que corrigir o req 7', async () => {
      render(<App />);

      const btnFilter = screen.getByRole('button',
      { name: /filtrar/i })
      expect(btnFilter).toBeDefined();
      const valueInput = screen.getByRole('spinbutton');
      expect(valueInput).toBeDefined();
      const comparisonInput = screen.getByTestId('comparison-filter')
      expect(comparisonInput).toBeDefined();
      const columnInput = screen.getByTestId('column-filter')
      expect(columnInput).toBeDefined();

      userEvent.type(comparisonInput, 'menor que');
      userEvent.type(columnInput, 'rotation_period');
      userEvent.type(valueInput, 24);
      userEvent.click(btnFilter);
      userEvent.type(comparisonInput, 'maior que');
      userEvent.type(columnInput, 'population');
      userEvent.type(valueInput, 8900);
      userEvent.click(btnFilter);

      const rows = document.getElementsByTagName('tr');
      await waitFor(() => {
        expect(rows).toHaveLength(9)});

      const btnDeleteAll = screen.getByTestId('button-remove-filters');
      expect(btnDeleteAll).toBeDefined();
      const filterDiv = screen.getAllByTestId('filter')
      expect(filterDiv).toBeDefined();
      expect(filterDiv).toHaveLength(2);
      userEvent.click(btnDeleteAll);
      // await waitFor(() => {
      //   expect(filterDiv).toBeDefined()});
  })
});