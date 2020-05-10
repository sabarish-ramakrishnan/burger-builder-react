import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} prod={props.prod} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    });
    if (transformedIngredients.length === 0) {
        transformedIngredients = <div> Please start adding ingredients</div>
    }
    let burgerStyle = null;
    if (props.width && props.height) {
        burgerStyle = { height: props.height, width: props.width }
    }
    return (
        <div className={classes.Burger} style={burgerStyle}>
            <BurgerIngredient type="bread-top" prod={props.prod} />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" prod={props.prod} />
        </div>
    )
}

export default Burger

