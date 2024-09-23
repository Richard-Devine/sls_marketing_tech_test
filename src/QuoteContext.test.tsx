import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {QuoteProvider, useQuote} from './QuoteContext';

jest.mock('./quoteClass');

const TestComponent = () => {
    const quote = useQuote();
    return <div data-testid="quote">{JSON.stringify(quote)}</div>;
};

beforeEach(() => {
    jest.clearAllMocks();
});

test('should provide a Quote instance to children', () => {
    render(
        <QuoteProvider>
            <TestComponent/>
        </QuoteProvider>
    );

    expect(screen.getByTestId('quote')).toBeInTheDocument();
    expect(screen.getByTestId('quote').textContent).toContain('{}');
});

test('should throw an error when useQuote is used outside of QuoteProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
    });

    const renderOutsideProvider = () => render(<TestComponent/>);

    expect(renderOutsideProvider).toThrow('useQuote must be used within a QuoteProvider');

    consoleError.mockRestore();
});