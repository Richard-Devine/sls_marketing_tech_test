import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import InformationHeader from "./InformationHeader";

test('submitted message test', () => {
    render(<InformationHeader/>)
    const submittedHeader = screen.getByTestId('information-header-image')
    const submittedMessage = screen.getByTestId('information-header-message')

    expect(submittedHeader).toBeInTheDocument()
    expect(submittedMessage).toHaveTextContent('Great, we have you test requirements, we just need a few more details to get your free quote')
})