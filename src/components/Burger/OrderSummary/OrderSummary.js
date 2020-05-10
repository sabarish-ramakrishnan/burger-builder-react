import React from 'react'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((igKey, i) => {
        return <li key={igKey + i}>{igKey}: {props.ingredients[igKey]}</li>
    });
    return (
        <div>
            <h3>Your Order</h3>
            <p>Below are your choices:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <b>{props.price} USD</b></p>
            <p>Want to Continue?</p>
            <Button btnType="Success" clicked={props.okclicked}>Ok</Button>
            <Button btnType="Danger" clicked={props.cancelclicked}>Cancel</Button>
        </div>
    )
}

export default OrderSummary
