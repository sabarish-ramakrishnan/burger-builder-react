import React from 'react'
import classes from './BuildControl.css';

const BuildControl = (props) => {
    //const buildclass = props.prod ? classes.BuildControl : '';
    const lessbuttonclass = props.prod ? classes.Less : '';
    const morebuttonclass = props.prod ? classes.More : '';
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={lessbuttonclass} onClick={()=>{props.ingredientsRemoved(props.type)}}>Less</button>
            <button className={morebuttonclass} onClick={()=>{props.ingredientsAdded(props.type)}}>More</button>
        </div>
    )
}

export default BuildControl
