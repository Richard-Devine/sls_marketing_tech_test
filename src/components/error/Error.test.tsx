import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Error from "./Error";
import userEvent from "@testing-library/user-event";
import React from "react";

jest.mock('../button/Button', () => (props: any) => (
    <button onClick={props.onClick} className={props.className} data-testid={'error-button'}></button>
));

const mockSetError = jest.fn();

test('error components test', async () => {
    render(<Error setError={mockSetError}/>);
    const errorButton = screen.getByTestId('error-button');
    const crossImage = screen.getByTestId('cross-image');
    const unhappyFaceImage = screen.getByTestId('unhappy-face-image');
    expect(errorButton).toBeTruthy()
    expect(crossImage).toBeTruthy()
    expect(unhappyFaceImage).toBeTruthy()
})

test('error ok onClick test', async () => {
    render(<Error setError={mockSetError}/>);
    const errorButton = screen.getByTestId('error-button');
    userEvent.click(errorButton);
    expect(mockSetError).toHaveBeenCalledWith(false);
})

test('error image onClick test', async () => {
    render(<Error setError={mockSetError}/>);
    const errorButton = screen.getByTestId('cross-image');
    userEvent.click(errorButton);
    expect(mockSetError).toHaveBeenCalledWith(false);
})