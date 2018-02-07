import React from 'react';
import PropTypes from 'prop-types';
import styles from './PilotMenu.css';
import store from 'reduxStore/store';

export default class PilotMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {className} = this.props;
        return (
            <div className={className + ' ' + styles.container}>

            </div>
        );
    }
}

PilotMenu.propTypes = {
    className: PropTypes.string
};

PilotMenu.defaultProps = {
    className: ''
};
