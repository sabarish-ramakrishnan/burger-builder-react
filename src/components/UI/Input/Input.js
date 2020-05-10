import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inpElement = null;
    let cssClasses = [classes.InputElement];

    let validationError = null;
    if (props.shouldValidate && props.touched && props.invalid) {
        cssClasses.push(classes.Invalid);
        validationError = <div className={classes.ValidationError}>Please enter a valid value!</div>;
    }
    switch (props.elementType) {
        case 'input':
            inpElement = <input className={cssClasses.join(' ')} onChange={props.changed}
                {...props.elementConfig} defaultValue={props.value} />
            break;
        case 'select':
            inpElement = (<select className={cssClasses.join(' ')} {...props.elementConfig} value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map((option) => {
                    return <option key={option.text + (new Date())} value={option.value}>{option.text}</option>
                })}
            </select>);
            break;
        default:
            inpElement = null;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.placeholder}</label>
            {inpElement}
            {validationError}
        </div>
    )
}

export default Input
