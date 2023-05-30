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
});
