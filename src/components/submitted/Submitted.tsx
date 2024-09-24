import './submitted.css';
import {useQuote} from "../../contexts/QuoteContext";

function Submitted() {

    const quote = useQuote()
    const {title, surname} = quote.getName()

    return (
        <div className={'submitted-container'}>
            <p className={'submitted-header'} data-testid={'submitted-header'}>Thank you {title} {surname}</p>
            <p className={'submitted-message'} data-testid={'submitted-message'}>We’ve received your enquiry and will
                get back to you soon to discuss your quote.</p>
        </div>
    )
}

export default Submitted;