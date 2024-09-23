import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Header from "../../components/header/Header";

test('header components exist', () => {
    render(<Header/>);
    const headerContainer = screen.getByTestId('header-container');
    const image = screen.getByTestId('header-image');
    expect(headerContainer).toBeTruthy()
    expect(image).toBeTruthy();
});