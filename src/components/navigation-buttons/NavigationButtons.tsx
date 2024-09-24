import BlackBackArrow from '../../icons/arrow-left-black.svg'
import BlackForwardArrow from '../../icons/arrow-right-black.svg'
import Button from "../button/Button";
import './navigationButtons.css'
import React from "react";

interface Props {
    backArrow: 'active' | 'inactive' | 'hidden';
    nextArrow: 'active' | 'inactive' | 'hidden';
    nextArrowSelected?: string;
    nextArrowOnClick?: () => void;
    backArrowOnClick?: () => void;
}

function NavigationButtons(
    {
        backArrow,
        nextArrow,
        nextArrowSelected,
        nextArrowOnClick,
        backArrowOnClick
    }: Props) {

    return (
        <div className={'navigation-buttons-container'}>
            <Button
                title={'Back'}
                image={<img src={BlackBackArrow} alt={"Back arrow"} height={'16px'}/>}
                imageLocation={'left'}
                className={`${backArrow} back-arrow`}
                onClick={() => backArrowOnClick ? backArrowOnClick() : null}
            />
            <Button
                title={'Next'}
                image={<img src={BlackForwardArrow} alt={"Forward arrow"} height={'16px'}/>}
                imageLocation={'right'}
                className={`${nextArrow} ${nextArrowSelected ? 'selected' : ''} next-arrow`}
                onClick={() => nextArrowOnClick ? nextArrowOnClick() : null}
            />
        </div>
    )
}

export default React.memo(NavigationButtons);