import React, { Component } from 'react';

import classes from './Order.css';
import Burger from '../../../components/Burger/Burger';

export class Order extends Component {
    render() {
        let ingredientsJsx = Object.keys(this.props.ingredients).map((key) => {
            return (
                <span key={key} style={{
                    textTransform: 'capitalize',
                    display: 'inline-block', margin: '0 8px',
                    border: '1px solid #ccc', padding: '5px'
                }}>
                    {key} ({this.props.ingredients[key]})
                </span>
            )
        });
        return (
            <div className={classes.Order}>
                <div style={{display:'inline-block'}}>
                    <Burger ingredients={this.props.ingredients} width="70px" height="70px" prod={this.props.prod} />
                </div>
                <div style={{display:'inline-block'}}>
                    <p><b>Ingredients:</b> {ingredientsJsx}</p>
                    <p><b>Price:</b> {Number.parseFloat(this.props.price).toFixed(2)} USD <b>Date:</b> {this.props.orderDate}</p>
                </div>
            </div>
        )
    }
}

export default Order
