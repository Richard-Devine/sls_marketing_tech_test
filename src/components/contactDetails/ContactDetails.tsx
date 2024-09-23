import Input from "../input/Input";
import Button from "../button/Button";
import NavigationButtons from "../navigation-buttons/NavigationButtons";
import {useQuote} from "../../QuoteContext";
import {useState} from "react";
import './contactDetails.css'

interface Props {
    setIdentity: (value: string) => void;
    setSubmitted: (value: string) => void;
}

function ContactDetails({setIdentity, setSubmitted}: Props) {

    const quote = useQuote()
    const {phoneNumber, emailAddress, keepUpdated} = quote.getContactDetails()
    const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber ? phoneNumber : '')
    const [emailAddressValue, setEmailAddressValue] = useState(emailAddress ? emailAddress : '')
    const [keepUpdatedValue, setKeepUpdatedValue] = useState(keepUpdated)

    const submitHandler = () => {
        if (phoneNumberValue && emailAddressValue) {
            quote.setContactDetails({
                phoneNumber: phoneNumberValue,
                emailAddress: emailAddressValue,
                keepUpdated: keepUpdatedValue,
            })
            setSubmitted('complete')
        }
    }

    return (
        <>
            <div className={'contact-details-container'}>
                <h1>Your Contact Details</h1>
                <div>
                    <h3>Phone Number*</h3>
                    <Input
                        saveTextInputValue={(inputValue: string) => setPhoneNumberValue(inputValue)}
                        defaultValue={phoneNumberValue}
                        placeHolder={"Phone Number"}
                        type={'number'}/>
                </div>
                <div>
                    <h3>Email Address*</h3>
                    <Input
                        saveTextInputValue={(inputValue: string) => setEmailAddressValue(inputValue)}
                        defaultValue={emailAddressValue}
                        placeHolder={"Email Address"}/>
                </div>
                <Input
                    saveCheckboxValue={(checkBoxValue) => setKeepUpdatedValue(checkBoxValue)}
                    type={'checkbox'}
                    checkboxLabel={'Keep me up to date with great offers'}/>
                <Button
                    title={'Get My Quotes Now'}
                    className={`get-quotes-button ${phoneNumberValue && emailAddressValue ? '' : 'inactive'}`}
                    onClick={() => submitHandler()}/>
                <p className={'t-and-c-text'} data-testid={'t-and-c-text'}>By submitting this form and based on your
                    requirements you agree on our terms & conditions</p>
            </div>
            <NavigationButtons
                backArrow={'active'}
                backArrowOnClick={() => setIdentity('')}
                nextArrow={'hidden'}/>
        </>
    )
}

export default ContactDetails;