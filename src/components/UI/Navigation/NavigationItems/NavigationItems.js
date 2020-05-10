import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const NavigationItems = () => {
    return (
        <div>
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/">Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/auth">SignUp/Login</NavigationItem>
            </ul>
        </div>
    )
}

export default NavigationItems
