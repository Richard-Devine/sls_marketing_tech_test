import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import App from './App'
import React from "react";

jest.mock('./components/header/Header', () => () => <div data-testid="header"></div>);
jest.mock('./components/footer/Footer', () => () => <div data-testid="footer"></div>);
jest.mock('./components/form/Form', () => () => <div data-testid="form"></div>);


test('app render test', () => {
    render(<App/>)
    expect(screen.getByTestId('app-container')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
})