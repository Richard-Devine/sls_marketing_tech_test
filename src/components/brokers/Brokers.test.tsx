import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import Brokers from "./Brokers";

import {act} from 'react';

test('brokers logos react to media sizes', async () => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
        configurable: true,
        writable: true,
        value: 1024,
    });

    render(<Brokers/>);
    const brokerLargeMediaLogos = await screen.findAllByTestId('broker-logo')
    const brokerTitle = screen.getByTestId('broker-title');
    expect(brokerLargeMediaLogos.length).toEqual(5);
    expect(brokerTitle).toHaveTextContent('Compare Test Quotes')

    Object.defineProperty(document.documentElement, 'clientWidth', {
        configurable: true,
        writable: true,
        value: 375,
    });

    act(() => {
        window.dispatchEvent(new Event('resize'));
    })
    const brokerSmallMediaLogos = await screen.findAllByTestId('broker-logo')
    expect(brokerSmallMediaLogos.length).toEqual(4);
})
