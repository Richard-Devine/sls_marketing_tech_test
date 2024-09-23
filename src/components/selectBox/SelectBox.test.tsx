import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import SelectBox from "./SelectBox";
import userEvent from "@testing-library/user-event";

const options = [
    'test option 1',
    'test option 2',
    'test option 3',
    'test option 4',
]

test('select box default render test', () => {
    const mockOnChange = jest.fn();

    render(<SelectBox options={options} onChange={mockOnChange} selectedValue={'placeholder'}/>);

    const selectBox: HTMLSelectElement = screen.getByTestId('select-box');
    const selectedOptionText = selectBox.options[selectBox.selectedIndex].textContent;

    expect(selectBox).toHaveValue('placeholder');
    expect(selectedOptionText).toBe('Select');
})

test('select box selectedValue test', () => {
    const mockOnChange = jest.fn();

    render(<SelectBox options={options} onChange={mockOnChange} selectedValue={'test option 4'}/>);

    const selectBox: HTMLSelectElement = screen.getByTestId('select-box');
    const selectedOptionText = selectBox.options[selectBox.selectedIndex].textContent;

    expect(selectBox).toHaveValue('test option 4');
    expect(selectedOptionText).toBe('test option 4');
})

test('select box onChange test', () => {
    const mockOnChange = jest.fn();

    render(<SelectBox options={options} onChange={mockOnChange} selectedValue={'placeholder'}/>);

    let selectBox: HTMLSelectElement = screen.getByTestId('select-box');

    userEvent.selectOptions(selectBox, 'test option 3');

    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith('test option 3')
})

test('select box placeholderText test', () => {
    const mockOnChange = jest.fn();

    render(<SelectBox options={options} onChange={mockOnChange} selectedValue={'placeholder'}
                      placeholderText={'test-placeholder-text'}/>);

    const selectBox: HTMLSelectElement = screen.getByTestId('select-box');
    const selectedOptionText = selectBox.options[selectBox.selectedIndex].textContent;

    expect(selectBox).toHaveValue('placeholder');
    expect(selectedOptionText).toBe('test-placeholder-text');
})