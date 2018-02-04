import React from 'react';
import PropTypes from 'prop-types';
import styles from './MenuPanel.css';
import {icons} from './MenuPanelIcons';

export default class MenuPanel extends React.Component {

    render() {
        const props = this.props;
        return (
            <ul className={styles.menu}>
                <div className={styles.playerName}>
                    <img src={icons.logo} className={styles.logo}/>
                    EDMonitor
                </div>
            </ul>
        );
    }
}

MenuPanel.propTypes = {};

MenuPanel.defaultProps = {};
