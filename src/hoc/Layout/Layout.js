import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }


    render() {
        return (
            <Aux>
                <Toolbar togglesidedrawer={this.sideDrawerToggleHandler} />
                <SideDrawer show={this.state.showSideDrawer} clicked={this.sideDrawerToggleHandler} />
                <div className={classes.Content}>{this.props.children}</div>
            </Aux>
        )
    }
}

export default Layout;