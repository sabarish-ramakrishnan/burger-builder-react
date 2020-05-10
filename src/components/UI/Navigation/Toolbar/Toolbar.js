import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            {/* <div onClick={props.togglesidedrawer} style={{ cursor: 'pointer', color:'white' }}>
                MENU
            </div> */}
            <DrawerToggle togglesidedrawer={props.togglesidedrawer} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header >
    )
}

export default Toolbar
