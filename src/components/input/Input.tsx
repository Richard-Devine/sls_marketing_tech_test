import './input.css'
import React, {useState} from "react";
import Tick from "../../icons/tick.svg";

interface Props {
    saveTextInputValue?: (inputValue: string) => void;
    saveCheckboxValue?: (inputValue: boolean) => void;
    type?: 'text' | 'number' | 'checkbox';
    placeHolder?: string;
    defaultValue?: string;
    checkboxLabel?: string;
}

function Input (
    {
        saveCheckboxValue = () => null,
        saveTextInputValue = () => null,
        placeHolder,
        checkboxLabel,
        defaultValue = '',
        type = 'text'
    }: Props): JSX.Element {

    const [inputValue, setInputValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(!!defaultValue);
    const [error, setError] = useState("");

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
        setChecked(checked);
        saveCheckboxValue(checked);
    };

    if (type === 'checkbox') {
        return (
            <div>
                <label className="checkbox-custom">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                        className="checkbox-hidden"
                        data-testid={'input-checkbox'}
                    />
                    <span className={`checkbox-checkmark ${checked ? "checkbox-checked" : ""}`}>{checked ?
                        <img src={Tick} alt={''} data-testid={'tick-image'}/> : ''}</span>
                    {checkboxLabel}
                </label>
            </div>
        )
    }

    const handleTextInputBlur = () => {
        setIsFocused(false);
        if (inputValue === "") {
            setError('This field is required');
            saveTextInputValue(inputValue);
        } else {
            if (type === 'text' || !type) {
                setError('')
                saveTextInputValue(inputValue);
            }
            if (type === 'number') {
                const regex = new RegExp('^[0-9]+[0-9\\s]*$')
                if (regex.test(inputValue)) {
                    setError('');
                    saveTextInputValue(inputValue);
                } else {
                    setError('This must be a number');
                }
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder={`${placeHolder ? placeHolder : 'Enter your text'}`}
                className={`text ${isFocused ? 'text-focused' : ''} ${error ? 'text-error' : ''}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleTextInputBlur}
                data-testid={'input-text'}
            />
            {error && (
                <p className={'text-error-message'} data-testid={'text-input-error'}>
                    {error}
                </p>
            )}
        </div>
    )
}

export default React.memo(Input);