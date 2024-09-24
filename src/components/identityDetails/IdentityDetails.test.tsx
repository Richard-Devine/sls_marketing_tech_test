import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import IdentityDetails from './IdentityDetails';
import {useQuote} from "../../contexts/QuoteContext";
import userEvent from "@testing-library/user-event";

jest.mock('../selectBox/SelectBox', () => (props: any) =>
    <select data-testid="select-box" onChange={(e) => props.onChange(e.target.value)}>
        <option value={'placeholder'} disabled hidden>{'Select'}</option>
        <option value={'Mr'}>{'Mr'}</option>
        <option value={'Miss'}>{'Miss'}</option>
    </select>);

jest.mock('../input/Input', () => (props: any) => (
    <input data-testid="input" value={props.value} onBlur={(e) => props.saveTextInputValue(e.target.value)}/>
));

jest.mock('../navigation-buttons/NavigationButtons', () => (props: any) =>
    <>
        <button onClick={props.backArrowOnClick} data-testid={'back-button'}></button>
        <button onClick={props.nextArrowOnClick} data-testid={'next-button'} className={props.nextArrow}></button>
    </>
);

jest.mock('../../contexts/QuoteContext', () => ({
    useQuote: jest.fn(),
}));

const mockSetIdentity = jest.fn()
const mockSetCoverAmountMock = jest.fn()
const mockSetName = jest.fn()

beforeEach(() => {
    (useQuote as jest.Mock).mockReturnValue({
        getName: () => ({
            title: '',
            firstName: '',
            surname: '',
        }),
        setName: mockSetName
    });
})

test('should call setIdentity when fields are filled', () => {
    render(<IdentityDetails setIdentity={mockSetIdentity} setCoverAmount={mockSetCoverAmountMock}/>);

    const nextButton = screen.getByTestId('next-button')
    const selectBox = screen.getByTestId('select-box')
    const inputs = screen.getAllByTestId('input')

    userEvent.selectOptions(selectBox, 'Mr');
    fireEvent.change(selectBox)
    userEvent.type(inputs[0], 'John');
    fireEvent.blur(inputs[0])
    userEvent.type(inputs[1], 'Doe');
    fireEvent.blur(inputs[1])
    userEvent.click(nextButton)

    expect(mockSetIdentity).toHaveBeenCalledWith('complete');
    expect(mockSetName).toHaveBeenCalledWith({title: 'Mr', firstName: 'John', surname: 'Doe'})
});

test('should not call setIdentity when all fields are not filled', () => {
    render(<IdentityDetails setIdentity={mockSetIdentity} setCoverAmount={mockSetCoverAmountMock}/>);

    const nextButton = screen.getByTestId('next-button')
    const selectBox = screen.getByTestId('select-box')
    const inputs = screen.getAllByTestId('input')

    userEvent.selectOptions(selectBox, 'Mr');
    fireEvent.change(selectBox)
    userEvent.type(inputs[0], 'John');
    fireEvent.blur(inputs[0])
    userEvent.click(nextButton)

    expect(mockSetIdentity).toHaveBeenCalledTimes(0)
    expect(mockSetName).toHaveBeenCalledTimes(0)
})

test('back button should call setCoverAmount', () => {
    render(<IdentityDetails setIdentity={mockSetIdentity} setCoverAmount={mockSetCoverAmountMock}/>);

    const backButton = screen.getByTestId('back-button')

    userEvent.click(backButton)

    expect(mockSetCoverAmountMock).toHaveBeenCalledWith('')
})

test('next button state updates correctly', () => {
    render(<IdentityDetails setIdentity={mockSetIdentity} setCoverAmount={mockSetCoverAmountMock}/>);

    const nextButton = screen.getByTestId('next-button')
    const selectBox = screen.getByTestId('select-box')
    const inputs = screen.getAllByTestId('input')

    expect(nextButton).toHaveClass('inactive')
    expect(nextButton).not.toHaveClass('active')

    userEvent.selectOptions(selectBox, 'Mr');
    fireEvent.change(selectBox)

    expect(nextButton).toHaveClass('inactive')
    expect(nextButton).not.toHaveClass('active')

    userEvent.type(inputs[1], 'Doe');
    fireEvent.blur(inputs[1])

    expect(nextButton).toHaveClass('inactive')
    expect(nextButton).not.toHaveClass('active')

    userEvent.type(inputs[0], 'John');
    fireEvent.blur(inputs[0])

    expect(nextButton).toHaveClass('active')
    expect(nextButton).not.toHaveClass('inactive')

    userEvent.clear(inputs[1]);
    fireEvent.blur(inputs[1])

    expect(nextButton).toHaveClass('inactive')
    expect(nextButton).not.toHaveClass('active')
})