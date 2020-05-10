import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls = (props) => {

    const buildclass = props.prod ? classes.BuildControls : '';
    return (
        <div className={buildclass}>
            <p>Total Price : <b>{props.totalprice} USD</b></p>
            {controls.map((i) => {
                return <BuildControl key={i.type} label={i.label} type={i.type}
                    ingredientsAdded={(type) => { props.ingredientsAdded(type) }}
                    ingredientsRemoved={(type) => { props.ingredientsRemoved(type) }} prod={props.prod}></BuildControl>
            })}
            <p>
                <button className={classes.OrderButton} disabled={!props.canPurchase} onClick={props.purchasingClick}>ORDER NOW</button></p>
        </div>
    )
}

export default BuildControls

