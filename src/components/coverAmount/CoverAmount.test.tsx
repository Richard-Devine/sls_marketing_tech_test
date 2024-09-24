import React from "react";
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {useQuote} from "../../contexts/QuoteContext";
import userEvent from "@testing-library/user-event";
import CoverAmount from "./CoverAmount";

jest.mock('../navigation-buttons/NavigationButtons', () => (props: any) =>
    <>
        <button onClick={props.backArrowOnClick} data-testid={'back-button'}></button>
        <button onClick={props.nextArrowOnClick} data-testid={'next-button'} className={props.nextArrow}></button>
    </>
);

jest.mock('../selectBox/SelectBox', () => (props: any) =>
    <select data-testid="select-box" onChange={(e) => props.onChange(e.target.value)}>
        <option value={'placeholder'} disabled hidden>{'£150,000'}</option>
        <option value={'£150,000'}>{'£150,000'}</option>
        <option value={'£160,000'}>{'£160,000'}</option>
    </select>);

jest.mock('../../contexts/QuoteContext', () => ({
    useQuote: jest.fn(),
}));

const mockSaveCoverAmount = jest.fn();
const mockSetCoverFor = jest.fn();
const mockSetCoverAmount = jest.fn();

beforeEach(() => {
    (useQuote as jest.Mock).mockReturnValue({
        getCoverAmount: () => (''),
        setCoverAmount: mockSaveCoverAmount
    });
})

test('next button onClick test', () => {
    render(<CoverAmount setCoverAmount={mockSetCoverAmount} setCoverFor={mockSetCoverFor}/>);

    const selectBox = screen.getByTestId('select-box')
    const nextButton = screen.getByTestId('next-button')

    userEvent.selectOptions(selectBox, '£150,000');
    fireEvent.change(selectBox)
    userEvent.click(nextButton)

    expect(mockSetCoverAmount).toHaveBeenCalledWith('complete');
    expect(mockSaveCoverAmount).toHaveBeenCalledWith('£150,000');
});

test('next button fail onClick test', () => {
    render(<CoverAmount setCoverAmount={mockSetCoverAmount} setCoverFor={mockSetCoverFor}/>);

    const nextButton = screen.getByTestId('next-button')

    userEvent.click(nextButton)

    expect(mockSetCoverAmount).toHaveBeenCalledTimes(0);
    expect(mockSaveCoverAmount).toHaveBeenCalledTimes(0);
});

test('back button should call setCoverAmount', () => {
    render(<CoverAmount setCoverAmount={mockSetCoverAmount} setCoverFor={mockSetCoverFor}/>);

    const backButton = screen.getByTestId('back-button')

    userEvent.click(backButton)

    expect(mockSetCoverFor).toHaveBeenCalledWith('')
})