import PilotMenu from "components/PilotMenu/PilotMenu";
import React from 'react';
import PropTypes from 'prop-types';
import PilotInfoConnector from "utils/model/pilotInfo/PilotInfoConnector";
import styles from './PilotMenuButton.css';
import store from 'reduxStore/store';
import pilotIcon from 'images/pilotIcon.png';

export default class PilotMenuButton extends React.Component {

    constructor(props) {
        super(props);
        this._pilotInfo = null;
        this.state = {menuOpened: false};
    }

    componentDidMount() {
        this._unsub = store.subscribe(() => {
            const needUpdate = this._updatePilotInfo();
            if (needUpdate) this.setState(this.state);
        });
    }
    componentWillUnmount() {
        if (typeof  this._unsub === 'function') this._unsub();
    }

    _updatePilotInfo() {
        const newPilotInfo = PilotInfoConnector.pilotInfo;
        if (this._pilotInfo === newPilotInfo) return false;
        this._pilotInfo = newPilotInfo;
        return true;
    }

    render() {
        return (
            <div className={styles.container}>
                <span className={styles.pilotName}>{PilotInfoConnector.name}</span>
                <img className={styles.pilotIcon} src={pilotIcon}/>

                <PilotMenu className={styles.pilotMenu}/>
            </div>
        );
    }
}

PilotMenuButton.propTypes = {};

PilotMenuButton.defaultProps = {};
