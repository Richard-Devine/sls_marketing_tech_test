import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import CoverFor from "./CoverFor";
import React from "react";
import {useQuote} from "../../QuoteContext";
import userEvent from "@testing-library/user-event";


jest.mock('../error/Error', () => () => (
    <div data-testid={'error-div'}/>
));

jest.mock('../button/Button', () => (props: any) => (
    <button onClick={props.onClick} className={props.className} data-testid={'cover-button'}></button>
));

jest.mock('../navigation-buttons/NavigationButtons', () => (props: any) =>
    <>
        <button onClick={props.backArrowOnClick} data-testid={'back-button'}></button>
        <button onClick={props.nextArrowOnClick} data-testid={'next-button'} className={props.nextArrow}></button>
    </>
);

jest.mock('../../QuoteContext', () => ({
    useQuote: jest.fn(),
}));

const mockSetCoverFor = jest.fn()
const setCoverFor = jest.fn()

test('next button onClick test', () => {
    (useQuote as jest.Mock).mockReturnValue({
        getCoverFor: () => '',
        setCoverFor: mockSetCoverFor
    });
    render(<CoverFor setCoverFor={setCoverFor}/>)

    const coverButtons = screen.getAllByTestId('cover-button')
    const nextButton = screen.getByTestId('next-button')

    userEvent.click(nextButton)

    expect(mockSetCoverFor).toBeCalledTimes(0)
    expect(setCoverFor).toBeCalledTimes(0)

    userEvent.click(coverButtons[0])
    userEvent.click(nextButton)

    expect(mockSetCoverFor).toBeCalledTimes(1)
    expect(mockSetCoverFor).toHaveBeenCalledWith('single')
    expect(setCoverFor).toBeCalledTimes(1)
    expect(setCoverFor).toHaveBeenCalledWith('complete')
})

test('error render test', () => {
    (useQuote as jest.Mock).mockReturnValue({
        getCoverFor: () => '',
        setCoverFor: mockSetCoverFor
    });
    render(<CoverFor setCoverFor={setCoverFor}/>)

    expect(screen.queryByTestId('error-div')).not.toBeInTheDocument()

    const coverButtons = screen.getAllByTestId('cover-button')
    const nextButton = screen.getByTestId('next-button')

    userEvent.click(coverButtons[1])
    userEvent.click(nextButton)

    expect(mockSetCoverFor).toBeCalledTimes(0)
    expect(setCoverFor).toBeCalledTimes(0)
    expect(screen.getByTestId('error-div')).toBeInTheDocument()
})

