import NavigationButtons from "../navigation-buttons/NavigationButtons";
import {useState} from "react";
import {useQuote} from "../../QuoteContext";
import SelectBox from "../selectBox/SelectBox";
import './coverAmount.css'

interface Props {
    setCoverFor: (coverFor: string) => void;
    setCoverAmount: (coverAmount: string) => void;
}

function CoverAmount({setCoverFor, setCoverAmount}: Props) {

    const quote = useQuote()
    const coverAmount = quote.getCoverAmount()
    const [selectedValue, setSelectedValue] = useState(coverAmount ? coverAmount : null)
    const [nextArrowStatus, setNextArrowStatus] = useState<'active' | 'inactive'>(selectedValue ? 'active' : 'inactive');

    const options = [
        '£100,000',
        '£110,000',
        '£120,000',
        '£130,000',
        '£140,000',
        '£150,000',
        '£160,000',
        '£170,000',
        '£180,000',
        '£190,000',
        '£200,000'
    ]

    const onChangeHandler = (value: string) => {
        setSelectedValue(value)
        setNextArrowStatus('active')
    }

    const saveCoverAmount = () => {
        if (selectedValue) {
            quote.setCoverAmount(selectedValue)
            setCoverAmount('complete')
        }
    }

    return (
        <>
            <div className={'cover-amount-container'}>
                <h1>How much cover <br/>would you like?</h1>
                <SelectBox
                    options={options}
                    className={`cover-amount-select ${coverAmount === selectedValue ? 'pre-selected' : ''}`}
                    selectedValue={selectedValue ? selectedValue : 'placeholder'}
                    onChange={onChangeHandler}
                    placeholderText={'£150,000'}
                />

            </div>
            <NavigationButtons
                backArrow={'active'}
                nextArrow={nextArrowStatus}
                nextArrowSelected={coverAmount}
                nextArrowOnClick={() => saveCoverAmount()}
                backArrowOnClick={() => setCoverFor('')}
            />
        </>
    )
}

export default CoverAmount;