import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EncodeDecode from './EncodeDecode';

describe('EncodeDecode', () => {
    test('renders without errors', () => {
        render(<EncodeDecode />);
    });

    test('renders correct interface initially', () => {
        const { getByText, getByPlaceholderText } = render(<EncodeDecode />);

        // Check if the correct interface elements are rendered initially
        expect(getByText('Guess the Encoded')).toBeInTheDocument();
        expect(getByPlaceholderText('Enter encoded value (Binary [0s and 1s])')).toBeInTheDocument();
        expect(getByText('Check')).toBeInTheDocument();
    });

    test('allows input and submission for guess option', () => {
        const { getByPlaceholderText, getByText } = render(<EncodeDecode />);
        const inputElement = getByPlaceholderText('Enter encoded value (Binary [0s and 1s])');
        const checkButton = getByText('Check');

        // Simulate user input
        fireEvent.change(inputElement, { target: { value: '11001010' } });

        // Verify that the input value is set correctly
        expect(inputElement.value).toBe('11001010');

        // Simulate button click
        fireEvent.click(checkButton);

    });

    test('renders correct interface after option change', () => {
        const { getByText, getByPlaceholderText } = render(<EncodeDecode />);
        const decodeOption = getByText('Decode the Encoded');

        // Simulate option change
        fireEvent.click(decodeOption);

        // Check if the correct interface elements are rendered after the option change
        expect(getByText('Guess the Decoded')).toBeInTheDocument();
        expect(getByPlaceholderText('Enter decoded value')).toBeInTheDocument();
        expect(getByText('Check')).toBeInTheDocument();
    });

    test('allows input and submission for decode option', () => {
        const { getByPlaceholderText, getByText } = render(<EncodeDecode />);
        const inputElement = getByPlaceholderText('Enter decoded value');
        const checkButton = getByText('Check');

        // Simulate user input
        fireEvent.change(inputElement, { target: { value: 'Hello, World!' } });

        // Verify that the input value is set correctly
        expect(inputElement.value).toBe('Hello, World!');

        // Simulate button click
        fireEvent.click(checkButton);

    });


    test('navigates back when "Back" button is clicked', () => {
        const { getByText, getByPlaceholderText } = render(<EncodeDecode />);
        const backButton = getByText('Back');

        // Simulate button click
        fireEvent.click(backButton);

        expect(navigateMock).toBeCalledWith(-1);

    });

    test('displays success message when the guessed encoded value is correct', () => {
        const { getByText, getByPlaceholderText } = render(<EncodeDecode />);
        const encodedInput = getByPlaceholderText('Enter encoded value (Binary [0s and 1s])');
        const checkButton = getByText('Check');

        fireEvent.change(encodedInput, { target: { value: '101010' } });
        fireEvent.click(checkButton);

        const successMessage = getByText('You have successfully guessed the encoded value');
        expect(successMessage).toBeInTheDocument();
    });

    test('displays failure message when the guessed encoded value is incorrect', () => {
        const { getByText, getByPlaceholderText } = render(<EncodeDecode />);
        const encodedInput = getByPlaceholderText('Enter encoded value (Binary [0s and 1s])');
        const checkButton = getByText('Check');

        fireEvent.change(encodedInput, { target: { value: '111111' } });
        fireEvent.click(checkButton);

        const failureMessage = getByText('You have failed to guess the encoded value');
        expect(failureMessage).toBeInTheDocument();
    });

    test('displays success message when the guessed decoded value is correct', () => {
        const { getByText, getByPlaceholderText } = render(<EncodeDecode />);
        const decodedInput = getByPlaceholderText('Enter decoded value');
        const checkButton = getByText('Check');

        fireEvent.change(decodedInput, { target: { value: 'OpenAI' } });
        fireEvent.click(checkButton);

        const successMessage = getByText('You have successfully guessed the decoded value');
        expect(successMessage).toBeInTheDocument();
    });

    test('displays failure message when the guessed decoded value is incorrect', () => {
        const { getByText, getByPlaceholderText } = render(<EncodeDecode />);
        const decodedInput = getByPlaceholderText('Enter decoded value');
        const checkButton = getByText('Check');

        fireEvent.change(decodedInput, { target: { value: 'IncorrectValue' } });
        fireEvent.click(checkButton);

        const failureMessage = getByText('You have failed to guess the decoded value');
        expect(failureMessage).toBeInTheDocument();
    });

    test('prevents invalid input for encoded value', () => {
        const { getByPlaceholderText } = render(<EncodeDecode />);
        const encodedInput = getByPlaceholderText('Enter encoded value (Binary [0s and 1s])');

        fireEvent.change(encodedInput, { target: { value: '12345' } });

        expect(encodedInput.value).toBe(''); // Ensure the input value is cleared
    });

    test('prevents invalid input for decoded value', () => {
        const { getByPlaceholderText } = render(<EncodeDecode />);
        const decodedInput = getByPlaceholderText('Enter decoded value');

        fireEvent.change(decodedInput, { target: { value: '@#$%' } });

        expect(decodedInput.value).toBe(''); // Ensure the input value is cleared
    });

});
