import PilotMenuButton from "components/PilotMenuButton/PilotMenuButton";
import React from 'react';
import PropTypes from 'prop-types';
import styles from './MenuPanel.css';
import {icons} from './MenuPanelIcons';

export default class MenuPanel extends React.Component {

    render() {
        return (
            <ul className={styles.menu}>
                <img src={icons.logo} className={styles.logo}/>
                <div className={styles.appName}><span className={styles.edAppName}>EDM</span>onitor</div>

                <div className={styles.spaceDivider}></div>

                <PilotMenuButton/>
            </ul>
        );
    }
}

MenuPanel.propTypes = {};

MenuPanel.defaultProps = {};
