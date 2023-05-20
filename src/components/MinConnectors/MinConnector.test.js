import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MinConnectors from './MinConnectors';

// Mocking the API function
jest.mock('../../api/api', () => ({
  insertPrimAnswer: jest.fn(),
}));

describe('MinConnectors', () => {
  beforeEach(() => {
    render(<MinConnectors />);
  });

  test('renders back button', () => {
    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
  });

  test('renders puzzle title', () => {
    const title = screen.getByText('Identify Minimum Connectors (Prim\'s Algorithm)');
    expect(title).toBeInTheDocument();
  });

  test('displays city distances table', () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('renders start city', () => {
    const startCity = screen.getByText(/Start City :/i);
    expect(startCity).toBeInTheDocument();
  });

  test('renders input and submit button', () => {
    const input = screen.getByPlaceholderText('Enter Minimum Distance To Reach All Cities (km)');
    const submitButton = screen.getByText('Submit');
    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('clicking back button navigates back', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockNavigate).toBeCalledWith(-1);
  });

  test('entering a valid answer and clicking submit triggers API call and resets the game', () => {
    const input = screen.getByPlaceholderText('Enter Minimum Distance To Reach All Cities (km)');
    const submitButton = screen.getByText('Submit');
    const mockInsertPrimAnswer = jest.requireMock('../../api/api').insertPrimAnswer;
    mockInsertPrimAnswer.mockResolvedValue({ data: { message: 'Success' } });

    // Enter a valid answer
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(submitButton);

    // Check that the API function is called with the correct arguments
    expect(mockInsertPrimAnswer).toBeCalledWith(expect.any(String), 100, expect.any(String));

    // Check that the game is reset (tryCount is reset to 3)
    const tryCount = mockInsertPrimAnswer.mock.instances[0].resetGame.mock.calls[0];
    expect(tryCount).toBe(3);
  });
});
