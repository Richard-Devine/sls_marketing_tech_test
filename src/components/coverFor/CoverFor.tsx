import Error from '../error/Error';
import Button from "../button/Button";
import NavigationButtons from "../navigation-buttons/NavigationButtons";
import PersonBlack from "../../icons/person-black.svg";
import PeopleBlack from "../../icons/people-black.svg";
import './coverFor.css';
import {useState} from "react";
import {useQuote} from "../../contexts/QuoteContext";


interface Props {
    setCoverFor: (coverFor: string) => void;
}

function CoverFor({setCoverFor}: Props) {

    const quote = useQuote()
    const cover = quote.getCoverFor()
    const [coverButtonSelected, setCoverButtonSelected] = useState(cover ? cover : '');
    const [nextArrowStatus, setNextArrowStatus] = useState<'active' | 'inactive'>(coverButtonSelected ? 'active' : 'inactive');
    const [error, setError] = useState(false);


    const onClickHandler = (cover: string) => {
        setCoverButtonSelected(cover);
        setNextArrowStatus('active')
    }

    const coverCheck = (coverButtonSelected: string) => {
        if (coverButtonSelected === 'multiple') {
            setError(true)
        } else if (coverButtonSelected === 'single') {
            quote.setCoverFor(coverButtonSelected)
            setCoverFor('complete')
        }
    }

    return (
        <>
            {error ? <Error setError={setError}/> : null}
            <div className={'cover-for-container'}>
                <h1>I'd like quotes for:</h1>
                <Button
                    title={'Just Me'}
                    image={<img src={PersonBlack} alt={'Person'}/>}
                    imageLocation={'left'}
                    className={`cover-for-button person-button ${coverButtonSelected === 'single' ? 'active' : ''}`}
                    onClick={() => onClickHandler('single')}/>
                <Button
                    title={'Me & My Partner'}
                    image={<img src={PeopleBlack} alt={'People'}/>}
                    imageLocation={'left'}
                    className={`cover-for-button people-button ${coverButtonSelected === 'multiple' ? 'active' : ''}`}
                    onClick={() => onClickHandler('multiple')}/>
            </div>
            <NavigationButtons
                backArrow={'hidden'}
                nextArrow={nextArrowStatus}
                nextArrowOnClick={() => coverCheck(coverButtonSelected)}
                nextArrowSelected={cover}
            />
        </>
    )
}

export default CoverFor;