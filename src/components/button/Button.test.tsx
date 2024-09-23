import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Button from "./Button";
import userEvent from "@testing-library/user-event";

test('button components exist', async () => {
    const mockOnClick = jest.fn()
    render(<Button title={'This is a test button'} onClick={mockOnClick}
                   image={<img src={'test'} alt={'test'} data-testid={'button-image'}/>}/>);
    const button = screen.getByTestId('button');
    const image = screen.getByTestId('button-image');
    expect(button).toBeTruthy();
    expect(image).toBeTruthy();
    userEvent.click(button)
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveTextContent('This is a test button');
})