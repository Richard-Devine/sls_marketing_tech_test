import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';
import userEvent from "@testing-library/user-event";

jest.mock('../brokers/Brokers', () => () => <div data-testid="brokers"></div>);
jest.mock('../informationHeader/InformationHeader', () => () => <div data-testid="information-header"></div>);
jest.mock('../coverFor/CoverFor', () => ({setCoverFor}: { setCoverFor: (value: string) => void }) => (
    <button data-testid="cover-for-next-button" onClick={() => setCoverFor('complete')}></button>
));
jest.mock('../coverAmount/CoverAmount', () => ({setCoverAmount, setCoverFor}: {
    setCoverAmount: (value: string) => void,
    setCoverFor: (value: string) => void
}) => (
    <>
        <button data-testid="cover-amount-next-button" onClick={() => setCoverAmount('complete')}></button>
        <button data-testid="cover-amount-back-button" onClick={() => setCoverFor('')}></button>
    </>
));
jest.mock('../identityDetails/IdentityDetails', () => ({setCoverAmount, setIdentity}: {
    setCoverAmount: (value: string) => void,
    setIdentity: (value: string) => void
}) => (
    <>
        <button data-testid="identity-details-next-button" onClick={() => setIdentity('complete')}></button>
        <button data-testid="identity-details-back-button" onClick={() => setCoverAmount('')}></button>
    </>
));
jest.mock('../contactDetails/ContactDetails', () => ({setIdentity, setSubmitted}: {
    setIdentity: (value: string) => void,
    setSubmitted: (value: string) => void
}) => (
    <>
        <button data-testid="contact-details-next-button" onClick={() => setSubmitted('complete')}></button>
        <button data-testid="contact-details-back-button" onClick={() => setIdentity('')}></button>
    </>

));
jest.mock('../submitted/Submitted', () => () => <div data-testid="submitted">Submitted</div>);


test('should render CoverFor and Brokers on initial load', () => {
    render(<Form/>);
    expect(screen.getByTestId('brokers')).toBeInTheDocument();
    expect(screen.getByTestId('cover-for-next-button')).toBeInTheDocument();
    expect(screen.queryByTestId('cover-amount-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('information-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('identity-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contact-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('submitted')).not.toBeInTheDocument();
});

test('should navigate to CoverAmount page when setCoverForHandler is called', () => {
    render(<Form/>);

    fireEvent.click(screen.getByTestId('cover-for-next-button'));

    expect(screen.getByTestId('brokers')).toBeInTheDocument();
    expect(screen.queryByTestId('cover-for-next-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('cover-amount-next-button')).toBeInTheDocument();
    expect(screen.queryByTestId('information-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('identity-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contact-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('submitted')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('cover-amount-back-button'));

    expect(screen.getByTestId('brokers')).toBeInTheDocument();
    expect(screen.getByTestId('cover-for-next-button')).toBeInTheDocument();
    expect(screen.queryByTestId('cover-amount-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('information-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('identity-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contact-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('submitted')).not.toBeInTheDocument();
});

test('should navigate to IdentityDetails when setCoverAmountHandler is called', () => {
    render(<Form/>);

    fireEvent.click(screen.getByTestId('cover-for-next-button'));

    fireEvent.click(screen.getByTestId('cover-amount-next-button'));

    expect(screen.queryByTestId('brokers')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-for-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-amount-next-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('information-header')).toBeInTheDocument();
    expect(screen.getByTestId('identity-details-next-button')).toBeInTheDocument();
    expect(screen.queryByTestId('contact-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('submitted')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('identity-details-back-button'));

    expect(screen.getByTestId('brokers')).toBeInTheDocument();
    expect(screen.queryByTestId('cover-for-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('cover-amount-next-button')).toBeInTheDocument();
    expect(screen.queryByTestId('information-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('identity-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contact-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('submitted')).not.toBeInTheDocument();
});

test('should navigate to ContactDetails when setIdentityHandler is called and back to identityDetails when unset', () => {
    render(<Form/>);

    userEvent.click(screen.getByTestId('cover-for-next-button'));
    userEvent.click(screen.getByTestId('cover-amount-next-button'));
    userEvent.click(screen.getByTestId('identity-details-next-button'));

    expect(screen.queryByTestId('brokers')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-for-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-amount-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('information-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('identity-details-next-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('contact-details-next-button')).toBeInTheDocument();
    expect(screen.queryByTestId('submitted')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('contact-details-back-button'));

    expect(screen.queryByTestId('brokers')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-for-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-amount-next-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('information-header')).toBeInTheDocument();
    expect(screen.getByTestId('identity-details-next-button')).toBeInTheDocument();
    expect(screen.queryByTestId('contact-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('submitted')).not.toBeInTheDocument();

});

test('should navigate to Submitted when setSubmitted is called', () => {
    render(<Form/>);

    fireEvent.click(screen.getByTestId('cover-for-next-button'));
    fireEvent.click(screen.getByTestId('cover-amount-next-button'));
    fireEvent.click(screen.getByTestId('identity-details-next-button'));
    fireEvent.click(screen.getByTestId('contact-details-next-button'));

    expect(screen.queryByTestId('brokers')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-for-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cover-amount-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('information-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('identity-details-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contact-details-next-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('submitted')).toBeInTheDocument();
});

