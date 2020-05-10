import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.css';

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.link} activeClassName={classes.active} exact>{props.children}</NavLink>
            {/* <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a> */}
        </li>
    )
}

export default NavigationItem
