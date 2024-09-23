import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import Input from "./Input";
import userEvent from "@testing-library/user-event";

interface Type {
    type: undefined | 'text'
}

const testTypes: Type[] = [{type: undefined}, {type: 'text'}]

test.each(testTypes)('text input renders correctly', async ({type}) => {
    render(<Input type={type}/>);
    const textInput = screen.getByTestId('input-text');
    const checkboxInput = screen.queryByTestId('input-checkbox');
    expect(textInput).toBeInTheDocument();
    expect(checkboxInput).not.toBeInTheDocument();
});

test('number input renders correctly', async () => {
    render(<Input type={'number'}/>);
    const textInput = screen.getByTestId('input-text');
    const checkboxInput = screen.queryByTestId('input-checkbox');
    expect(textInput).toBeInTheDocument()
    expect(checkboxInput).not.toBeInTheDocument();
});

test('checkbox input renders correctly', async () => {
    render(<Input type={'checkbox'}/>);
    const textInput = screen.queryByTestId('input-text');
    const checkboxInput = screen.getByTestId('input-checkbox');
    expect(textInput).not.toBeInTheDocument();
    expect(checkboxInput).toBeInTheDocument();
});

test.each(testTypes)('text input onBlur test', async ({type}) => {
    const mockSaveTextInputValue = jest.fn();
    render(<Input type={type} saveTextInputValue={mockSaveTextInputValue}/>);
    const textInput = screen.getByTestId('input-text');

    fireEvent.blur(textInput);
    expect(mockSaveTextInputValue).toBeCalledTimes(1);
    expect(mockSaveTextInputValue).toHaveBeenCalledWith('');

    userEvent.type(textInput, 'input test');
    fireEvent.blur(textInput);
    expect(mockSaveTextInputValue).toBeCalledTimes(2);
    expect(mockSaveTextInputValue).toHaveBeenCalledWith('input test');
});

test.each(testTypes)('text input error message test', async ({type}) => {
    render(<Input type={type}/>);
    const textInput = screen.getByTestId('input-text');
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();

    fireEvent.blur(textInput);
    const errorMessage = screen.getByTestId('text-input-error');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This field is required');

    userEvent.type(textInput, 'input test');
    fireEvent.blur(textInput);
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
});

test.each(testTypes)('text input prefilled test', async ({type}) => {
    render(<Input type={type} defaultValue={'value test'}/>);
    const textInput = screen.getByTestId('input-text');
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
    expect(textInput).toHaveValue('value test')
});

test('text input placeholder test', async () => {
    render(<Input type={'number'} placeHolder={'text placeholder'}/>);
    const numberInput = screen.getByTestId('input-text');
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
    expect(numberInput).toHaveAttribute('placeholder', 'text placeholder')
});

test('number input error test', async () => {
    render(<Input type={'number'}/>);
    const numberInput = screen.getByTestId('input-text');
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();

    fireEvent.blur(numberInput);
    const errorMessage = screen.getByTestId('text-input-error');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This field is required');

    userEvent.type(numberInput, 'input test');
    fireEvent.blur(numberInput);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This must be a number');

    userEvent.clear(numberInput);
    userEvent.type(numberInput, '02342 025025');
    fireEvent.blur(numberInput);
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
});

test('number input onBlur test', async () => {
    const mockSaveTextInputValue = jest.fn();
    render(<Input type={'number'} saveTextInputValue={mockSaveTextInputValue}/>);
    const numberInput = screen.getByTestId('input-text');

    fireEvent.blur(numberInput);
    expect(mockSaveTextInputValue).toBeCalledTimes(1);

    userEvent.type(numberInput, 'input test');
    fireEvent.blur(numberInput);
    expect(mockSaveTextInputValue).toBeCalledTimes(1);

    userEvent.clear(numberInput)
    userEvent.type(numberInput, '97215125');
    fireEvent.blur(numberInput);
    expect(mockSaveTextInputValue).toBeCalledTimes(2);
    expect(mockSaveTextInputValue).toHaveBeenCalledWith('97215125');
});

test('number input prefilled test', async () => {
    render(<Input type={'number'} defaultValue={'value test'}/>);
    const numberInput = screen.getByTestId('input-text');
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
    expect(numberInput).toHaveValue('value test')
});

test('number input placeholder test', async () => {
    render(<Input type={'number'} placeHolder={'number placeholder'}/>);
    const numberInput = screen.getByTestId('input-text');
    expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
    expect(numberInput).toHaveAttribute('placeholder', 'number placeholder')
});

test('checkbox onChange test', async () => {
    const mockSaveTextInputValue = jest.fn();
    render(<Input type={'checkbox'} saveCheckboxValue={mockSaveTextInputValue}/>);
    const checkboxInput = screen.getByTestId('input-checkbox');

    userEvent.click(checkboxInput);
    expect(mockSaveTextInputValue).toBeCalledTimes(1);
    expect(mockSaveTextInputValue).toHaveBeenCalledWith(true);

    userEvent.click(checkboxInput);
    expect(mockSaveTextInputValue).toBeCalledTimes(2);
    expect(mockSaveTextInputValue).toHaveBeenCalledWith(false);
});

test('checkbox onChange image test', async () => {
    render(<Input type={'checkbox'}/>);
    const checkboxInput = screen.getByTestId('input-checkbox');
    expect(screen.queryByTestId('tick-image')).not.toBeInTheDocument()

    userEvent.click(checkboxInput);
    const tickImage = screen.getByTestId('tick-image')
    expect(tickImage).toBeInTheDocument()

    userEvent.click(checkboxInput);
    expect(screen.queryByTestId('tick-image')).not.toBeInTheDocument()
});