import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShortPath from './ShortPath';

describe('ShortPath component', () => {
  test('renders ShortPath component', () => {
    render(<ShortPath />);
    const backButton = screen.getByText('Back');
    const puzzleTitle = screen.getByText('Identify Shortest Path (Dijkstra\'s Algorithm)');
    expect(backButton).toBeInTheDocument();
    expect(puzzleTitle).toBeInTheDocument();
  });

  test('clicking back button triggers handleBack function', () => {
    const mockHandleBack = jest.fn();
    render(<ShortPath />);
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    expect(mockHandleBack).toHaveBeenCalledTimes(1);
  });

  test('displays city distances table', () => {
    render(<ShortPath />);
    const cityDistancesTable = screen.getByTestId('city-distances-table');
    expect(cityDistancesTable).toBeInTheDocument();
  });

  test('checks validity of input distances', () => {
    render(<ShortPath />);
    const checkButton = screen.getByText('Check');
    const cityAInput = screen.getByTestId('city-A-input');
    const cityBInput = screen.getByTestId('city-B-input');
    const cityCInput = screen.getByTestId('city-C-input');

    // Test valid input
    fireEvent.change(cityAInput, { target: { value: '10' } });
    fireEvent.change(cityBInput, { target: { value: '20' } });
    fireEvent.change(cityCInput, { target: { value: '30' } });
    fireEvent.click(checkButton);
    // Add assertions for the expected behavior

    // Test missing input
    fireEvent.change(cityAInput, { target: { value: '10' } });
    fireEvent.change(cityBInput, { target: { value: '20' } });
    fireEvent.change(cityCInput, { target: { value: '' } });
    fireEvent.click(checkButton);
    // Add assertions for the expected behavior

    // Test invalid input
    fireEvent.change(cityAInput, { target: { value: '10' } });
    fireEvent.change(cityBInput, { target: { value: '20' } });
    fireEvent.change(cityCInput, { target: { value: 'invalid' } });
    fireEvent.click(checkButton);
    // Add assertions for the expected behavior
  });

});
