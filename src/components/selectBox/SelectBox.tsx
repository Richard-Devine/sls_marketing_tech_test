import DownArrowBlue from '../../icons/arrow-down-blue.svg'
import './selectBox.css'

interface Props {
    options: string[];
    className?: string;
    onChange: (value: string) => void;
    selectedValue: string
    placeholderText?: string
}

function SelectBox(
    {
        options,
        className,
        selectedValue,
        onChange,
        placeholderText,
    }: Props) {

    const createOptions = (options: Props['options']) => {
        return options.map((option, index) => <option value={option} key={option + index}
                                                      className={'select-option'}>{option}</option>)
    }

    return (
        <div className={`${className} select-box-container`}>
            <select value={selectedValue} onChange={(e) => onChange(e.target.value)} data-testid={'select-box'}>
                <option value={'placeholder'} disabled hidden>{placeholderText ?? 'Select'}</option>
                {createOptions(options)}
            </select>
            <img src={DownArrowBlue} alt={'down arrow'} className={'select-arrow'}/>
        </div>
    )
}

export default SelectBox;