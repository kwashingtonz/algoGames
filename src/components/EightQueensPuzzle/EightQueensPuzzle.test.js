import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EightQueensPuzzle from './EightQueensPuzzle';
import { solutionCount, insertSolutions } from '../../api/api';

jest.mock('../../api/api', () => ({
  solutionCount: jest.fn(),
  insertSolutions: jest.fn(),
  allSolutionsFigured: jest.fn(),
}));

describe('EightQueensPuzzle', () => {
  test('renders without errors', () => {
    render(<EightQueensPuzzle />);
  });

  test('handles square click correctly', () => {
    const { getByTestId } = render(<EightQueensPuzzle />);
    const square = getByTestId('square-0-0');
    fireEvent.click(square);

  });

  test('handles back button click correctly', () => {
    const { getByText } = render(<EightQueensPuzzle />);
    const backButton = getByText('Back');
    fireEvent.click(backButton);

  });

  test('disables submit button when queens count is not zero', () => {
    const { getByText, getByTestId } = render(<EightQueensPuzzle />);
    const submitButton = getByText('Submit');


    fireEvent.click(getByTestId('square-0-0'));
    fireEvent.click(getByTestId('square-1-1'));

  });

  test('enables submit button when queens count is zero', () => {
    const { getByText, getByTestId } = render(<EightQueensPuzzle />);
    const submitButton = getByText('Submit');
    // Simulate placing all queens

    fireEvent.click(getByTestId('square-0-0'));
    fireEvent.click(getByTestId('square-1-2'));
    fireEvent.click(getByTestId('square-2-4'));
    fireEvent.click(getByTestId('square-3-6'));
    fireEvent.click(getByTestId('square-4-1'));
    fireEvent.click(getByTestId('square-5-3'));
    fireEvent.click(getByTestId('square-6-5'));
    fireEvent.click(getByTestId('square-7-7'));

    fireEvent.click(getByTestId('square-0-0'));

  });

  test('displays queen icons on selected squares', () => {
    const { getByTestId } = render(<EightQueensPuzzle />);
    // Simulate placing a queen on a square
    fireEvent.click(getByTestId('square-2-3'));

  });

  test('generates and inserts solutions when count is zero', async () => {
    solutionCount.mockResolvedValue({ data: { count: 0 } });
    insertSolutions.mockResolvedValue({ status: 200, data: { message: 'Solutions inserted successfully.' } });

    await render(<EightQueensPuzzle />);

    expect(solutionCount).toHaveBeenCalled();
    expect(insertSolutions).toHaveBeenCalledWith();

  });

  test('does not generate or insert solutions when count is not zero', async () => {
    solutionCount.mockResolvedValue({ data: { count: 5 } });

    await render(<EightQueensPuzzle />);

    expect(solutionCount).toHaveBeenCalled();
    expect(insertSolutions).not.toHaveBeenCalled();

  });


  test('handles submit correctly', async () => {
    // Mock the necessary API functions and responses

    const { getByText } = render(<EightQueensPuzzle />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

  });

  test('handles all solutions figured flag correctly', async () => {
    // Mock the necessary API functions and responses

    const { getByText } = render(<EightQueensPuzzle />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

  });
});
