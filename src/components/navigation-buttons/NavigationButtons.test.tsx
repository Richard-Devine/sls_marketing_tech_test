import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import NavigationButtons from "./NavigationButtons";


jest.mock('../button/Button', () => (props: any) => (
    <button onClick={props.onClick} className={props.className}>
        {props.title}
    </button>
));

test('navigation next and back arrow onClick test', () => {
    const mockNextOnClick = jest.fn()
    render(<NavigationButtons backArrow={'inactive'} nextArrow={'active'} nextArrowOnClick={mockNextOnClick}/>)
    const nextButton = screen.getByText('Next')
    userEvent.click(nextButton)
    expect(mockNextOnClick).toHaveBeenCalledTimes(1)
});

test('nav back arrow onClick test', () => {
    const mockBackOnClick = jest.fn()
    render(<NavigationButtons backArrow={'active'} nextArrow={'inactive'} backArrowOnClick={mockBackOnClick}/>)
    const backButton = screen.getByText('Back')
    userEvent.click(backButton)
    expect(mockBackOnClick).toHaveBeenCalledTimes(1)
})