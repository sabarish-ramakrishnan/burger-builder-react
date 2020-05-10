import React from 'react'

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckOutSummary.css';

const CheckOutSummary = (props) => {

    return (
        <div className={classes.CheckOutSummary}>
            <h4>Your Burger</h4>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} prod={props.prod} />
            </div>
            <Button btnType="Success" clicked={props.okclicked}>Ok</Button>
            <Button btnType="Danger" clicked={props.cancelclicked}>Cancel</Button>
        </div>
    )
}

export default CheckOutSummary
