import NavigationButtons from "../navigation-buttons/NavigationButtons";
import {useEffect, useState} from "react";
import SelectBox from "../selectBox/SelectBox";
import Input from "../input/Input"
import {useQuote} from "../../contexts/QuoteContext";
import './identityDetails.css'

interface Props {
    setIdentity: (identity: string) => void;
    setCoverAmount: (coverAmount: string) => void;
}

function IdentityDetails({setIdentity, setCoverAmount}: Props) {

    const quote = useQuote()
    const {title, firstName, surname} = quote.getName()
    const [titleValue, setTitleValue] = useState(title)
    const [firstNameValue, setFirstNameValue] = useState(firstName)
    const [surnameValue, setSurnameValue] = useState(surname)
    const [nextArrowStatus, setNextArrowStatus] = useState<'active' | 'inactive'>((titleValue && firstNameValue && surnameValue) ? 'active' : 'inactive');

    const nextArrowSelected = title && firstName && surname

    const identityCheck = (title: string, firstName: string, surname: string) => {
        if (!title || !firstName || !surname) return
        quote.setName({title: titleValue, firstName: firstNameValue, surname: surnameValue})
        setIdentity('complete')
    }

    useEffect(() => {
        if (titleValue && firstNameValue && surnameValue) {
            setNextArrowStatus("active")
        } else {
            setNextArrowStatus("inactive")
        }
    }, [titleValue, firstNameValue, surnameValue])

    const options = [
        'Mr',
        'Ms',
        'Miss',
        'Mrs',
    ]
    return (
        <>
            <div className={'identity-details-container'}>
                <div>
                    <h3>Title*</h3>
                    <SelectBox
                        options={options}
                        className={`title-select ${title === titleValue && titleValue ? 'pre-selected' : ''}`}
                        onChange={(title) => setTitleValue(title)}
                        selectedValue={titleValue ? titleValue : 'placeholder'}/>
                </div>
                <div>
                    <h3>First Name*</h3>
                    <Input
                        saveTextInputValue={(firstName) => setFirstNameValue(firstName)}
                        placeHolder={'First Name'}
                        defaultValue={firstNameValue}/>
                </div>
                <div>
                    <h3>Last Name*</h3>
                    <Input
                        saveTextInputValue={(lastName) => setSurnameValue(lastName)}
                        placeHolder={'Last Name'}
                        defaultValue={surnameValue}/>
                </div>
            </div>
            <NavigationButtons
                backArrow={'active'}
                nextArrow={nextArrowStatus}
                nextArrowSelected={nextArrowSelected ? 'selected' : ''}
                nextArrowOnClick={() => identityCheck(titleValue, firstNameValue, surnameValue)}
                backArrowOnClick={() => setCoverAmount('')}
            />
        </>
    )
}

export default IdentityDetails