import Button from "../button/Button";
import Cross from '../../icons/cross-white.svg'
import UnhappyFace from '../../icons/unhappy-face.svg'
import './error.css';

interface Props {
    setError: (error: boolean) => void;
}

function Error({setError}: Props) {
    return (
        <>
            <div className={'error-container'}></div>
            <div className={'error-modal'}>
                <img src={Cross} alt={'cross'} className={'cross-image'} onClick={() => setError(false)}
                     data-testid={'cross-image'}/>
                <img src={UnhappyFace} alt={'unhappy-face'} data-testid={'unhappy-face-image'}/>
                <h2>Sorry, but we can't help <br/>you</h2>
                <Button title={'OK'} onClick={() => setError(false)} className={'ok-button'}/>
            </div>
        </>
    )
}

export default Error;