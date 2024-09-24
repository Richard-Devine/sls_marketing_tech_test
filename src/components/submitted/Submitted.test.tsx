import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Submitted from "./Submitted";
import {useQuote} from "../../contexts/QuoteContext";

jest.mock('../../contexts/QuoteContext', () => ({
    useQuote: jest.fn(),
}));

test('submitted message test', () => {
    (useQuote as jest.Mock).mockReturnValue({
        getName: () => ({
            title: 'Mr',
            surname: 'Doe',
        })
    });

    render(<Submitted/>)
    const submittedHeader = screen.getByTestId('submitted-header')
    const submittedMessage = screen.getByTestId('submitted-message')

    expect(submittedHeader).toHaveTextContent('Thank you Mr Doe')
    expect(submittedMessage).toHaveTextContent('We’ve received your enquiry and will get back to you soon to discuss your quote.')
})