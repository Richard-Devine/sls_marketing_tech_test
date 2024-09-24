import './button.css';
import React, {JSX} from "react";

interface ButtonProps {
    title: string;
    image?: JSX.Element;
    imageLocation?: 'left' | 'right';
    className?: string,
    onClick?: () => void
}

function Button(
    {
        title,
        image,
        imageLocation,
        className,
        onClick,
    }: ButtonProps) {

    return (
        <div
            className={`button-container ${imageLocation} ${className} `}
            onClick={onClick}
            data-testid={'button'}
        >
            <h3>{title}</h3> {image ? image : ""}
        </div>
    )
}

export default React.memo(Button);