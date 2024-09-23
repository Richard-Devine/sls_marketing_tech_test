import React from "react";
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import ContactDetails from "./ContactDetails";
import {useQuote} from "../../QuoteContext";
import userEvent from "@testing-library/user-event";


jest.mock('../input/Input', () => (props: any) => {
    if (props.type === 'checkbox') {
        return (
            <input data-testid="check-box-input" type={"checkbox"} value={props.value}
                   onChange={(e) => props.saveCheckboxValue(e.target.checked)}/>
        )
    } else {
        return (
            <input data-testid="input" value={props.value} onBlur={(e) => props.saveTextInputValue(e.target.value)}/>
        )
    }
});

jest.mock('../navigation-buttons/NavigationButtons', () => (props: any) =>
    <>
        <button onClick={props.backArrowOnClick} data-testid={'back-button'}></button>
        <button onClick={props.nextArrowOnClick} data-testid={'next-button'} className={props.nextArrow}></button>
    </>
);

jest.mock('../button/Button', () => (props: any) => (
    <button onClick={props.onClick} className={props.className} data-testid={'get-quote-button'}>
        {props.title}
    </button>
));

jest.mock('../../QuoteContext', () => ({
    useQuote: jest.fn(),
}));

const mockSetCoverDetails = jest.fn();
const mockSetIdentity = jest.fn();
const mockSetSubmitted = jest.fn();

beforeEach(() => {
    (useQuote as jest.Mock).mockReturnValue({
        getContactDetails: () => ({
            phoneNumber: '', emailAddress: '', keepUpdated: false
        }),
        setContactDetails: mockSetCoverDetails
    });
})

test('next button fail onClick test', () => {
    render(<ContactDetails setIdentity={mockSetIdentity} setSubmitted={mockSetSubmitted}/>);

    const getQuoteButton = screen.getByTestId('get-quote-button')
    const checkBox = screen.getByTestId('check-box-input')
    const inputs = screen.getAllByTestId('input')

    userEvent.type(inputs[0], '01214141');
    fireEvent.blur(inputs[0])
    userEvent.click(checkBox);
    fireEvent.change(checkBox)
    userEvent.click(getQuoteButton)

    expect(mockSetSubmitted).toHaveBeenCalledTimes(0);
    expect(mockSetCoverDetails).toHaveBeenCalledTimes(0);
});

test('next button success onClick test', () => {
    render(<ContactDetails setIdentity={mockSetIdentity} setSubmitted={mockSetSubmitted}/>);

    const getQuoteButton = screen.getByTestId('get-quote-button')
    const checkBox = screen.getByTestId('check-box-input')
    const inputs = screen.getAllByTestId('input')

    userEvent.type(inputs[0], '01214141');
    fireEvent.blur(inputs[0])
    userEvent.type(inputs[1], 'JDoe@test.com');
    fireEvent.blur(inputs[1])
    userEvent.click(checkBox);
    fireEvent.change(checkBox)
    userEvent.click(getQuoteButton)

    expect(mockSetSubmitted).toHaveBeenCalledWith('complete');
    expect(mockSetCoverDetails).toHaveBeenCalledWith({
        emailAddress: 'JDoe@test.com',
        phoneNumber: '01214141',
        keepUpdated: true
    })
});


test('back button should call setCoverAmount', () => {
    render(<ContactDetails setIdentity={mockSetIdentity} setSubmitted={mockSetSubmitted}/>);

    const backButton = screen.getByTestId('back-button')

    userEvent.click(backButton)

    expect(mockSetIdentity).toHaveBeenCalledWith('')
})

test('get quote button state updates correctly', () => {
    render(<ContactDetails setIdentity={mockSetIdentity} setSubmitted={mockSetSubmitted}/>);

    const getQuoteButton = screen.getByTestId('get-quote-button')
    const inputs = screen.getAllByTestId('input')

    expect(getQuoteButton).toHaveClass('inactive')

    userEvent.type(inputs[0], '4515415');
    fireEvent.blur(inputs[0])

    expect(getQuoteButton).toHaveClass('inactive')

    userEvent.type(inputs[1], 'JDoe@test.com');
    fireEvent.blur(inputs[1])

    expect(getQuoteButton).not.toHaveClass('inactive')

    userEvent.clear(inputs[1]);
    fireEvent.blur(inputs[1])

    expect(getQuoteButton).toHaveClass('inactive')
})

test('T&C text exists', () => {
    render(<ContactDetails setIdentity={mockSetIdentity} setSubmitted={mockSetSubmitted}/>);

    const tAndCText = screen.getByTestId('t-and-c-text')
    expect(tAndCText).toHaveTextContent('By submitting this form and based on your requirements you agree on our terms & conditions')
})

