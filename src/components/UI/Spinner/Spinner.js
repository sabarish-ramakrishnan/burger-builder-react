import React from 'react';
import classes from './Spinner.css';

const Spinner = (props) => {
    return (
        <div>
            <div className={classes.Loader}>Loading...</div>
        </div>
    )
}

export default Spinner
