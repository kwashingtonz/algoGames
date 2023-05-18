import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';

describe('TicTacToe', () => {
    test('renders without errors', () => {
        render(<TicTacToe />);
    });

    test('starts with initial state', () => {
        const { getByText } = render(<TicTacToe />);
        expect(getByText('Tic Tac Toe')).toBeInTheDocument();
        expect(getByText('Select Mark')).toBeInTheDocument();
        expect(getByText('X')).toBeInTheDocument();
        expect(getByText('O')).toBeInTheDocument();
    });

    test('clicking X button starts game with player mark X', () => {
        const { getByText } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        expect(getByText('You play first!')).toBeInTheDocument();
    });

    test('clicking O button starts game with player mark O', () => {
        const { getByText } = render(<TicTacToe />);
        fireEvent.click(getByText('O'));
        expect(getByText('Computer Played First. Your Turn!')).toBeInTheDocument();
    });

    test('clicking a cell updates the board and switches turns', () => {
        const { getByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        expect(getByText('X')).toBeInTheDocument();
        expect(getByText('Computer Turn!')).toBeInTheDocument();
    });

    test('clicking a cell when it is not the player\'s turn does not update the board', () => {
        const { getByText, queryByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByTestId('cell-1-1'));
        expect(getByText('X')).toBeInTheDocument();
        expect(queryByText('O')).toBeNull();
    });

    test('clicking a cell when the game is over does not update the board', () => {
        const { getByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByTestId('cell-1-1'));
        fireEvent.click(getByTestId('cell-1-0'));
        fireEvent.click(getByTestId('cell-2-1'));
        fireEvent.click(getByTestId('cell-2-0'));
        expect(getByText('Draw')).toBeInTheDocument();
        fireEvent.click(getByTestId('cell-0-2'));
        expect(getByText('Draw')).toBeInTheDocument();
    });

    test('clicking restart button resets the board and game state', () => {
        const { getByText, getByTestId, queryByText } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByText('Restart'));
        expect(queryByText('X')).toBeNull();
        expect(queryByText('O')).toBeNull();
        expect(queryByText('Computer Turn!')).toBeNull();
    });

    test('clicking back button navigates back', () => {
        const navigateMock = jest.fn();
        jest.mock('react-router-dom', () => ({
            useNavigate: () => navigateMock,
        }));

        const { getByText } = render(<TicTacToe />);
        fireEvent.click(getByText('Back'));
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(-1);
    });



    test('clicking a cell when it is already occupied does not update the board', () => {
        const { getByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByTestId('cell-0-0'));
        expect(getByText('X')).toBeInTheDocument();
        expect(getByText('Computer Turn!')).toBeInTheDocument();
    });

    test('detects a win when a row is filled', () => {
        const { getByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByTestId('cell-1-0'));
        fireEvent.click(getByTestId('cell-0-1'));
        fireEvent.click(getByTestId('cell-1-1'));
        fireEvent.click(getByTestId('cell-0-2'));
        expect(getByText('X wins!')).toBeInTheDocument();
    });

    test('detects a win when a column is filled', () => {
        const { getByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('O'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByTestId('cell-0-1'));
        fireEvent.click(getByTestId('cell-1-0'));
        fireEvent.click(getByTestId('cell-1-1'));
        fireEvent.click(getByTestId('cell-2-0'));
        fireEvent.click(getByTestId('cell-2-1'));
        expect(getByText('O wins!')).toBeInTheDocument();
    });

    test('detects a win when a diagonal is filled', () => {
        const { getByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByTestId('cell-0-1'));
        fireEvent.click(getByTestId('cell-1-1'));
        fireEvent.click(getByTestId('cell-0-2'));
        fireEvent.click(getByTestId('cell-2-2'));
        expect(getByText('X wins!')).toBeInTheDocument();
    });

    test('detects a draw when all cells are filled', () => {
        const { getByText, getByTestId } = render(<TicTacToe />);
        fireEvent.click(getByText('X'));
        fireEvent.click(getByTestId('cell-0-0'));
        fireEvent.click(getByTestId('cell-0-1'));
        fireEvent.click(getByTestId('cell-0-2'));
        fireEvent.click(getByTestId('cell-1-1'));
        fireEvent.click(getByTestId('cell-1-0'));
        fireEvent.click(getByTestId('cell-1-2'));
        fireEvent.click(getByTestId('cell-2-1'));
        fireEvent.click(getByTestId('cell-2-0'));
        fireEvent.click(getByTestId('cell-2-2'));
        expect(getByText('Draw')).toBeInTheDocument();
    });

});
