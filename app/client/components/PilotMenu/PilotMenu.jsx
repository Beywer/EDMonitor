import React from 'react';
import PropTypes from 'prop-types';
import LocationInfoConnector from "utils/model/locationInfo/LocationInfoConnector";
import PilotInfoConnector from "utils/model/pilotInfo/PilotInfoConnector";
import ShipInfoConnector from "utils/model/shipInfo/ShipInfoConnector";
import styles from './PilotMenu.css';
import store from 'reduxStore/store';

export default class PilotMenu extends React.Component {

    constructor(props) {
        super(props);
        this._pilotInfo = null;
        this._shipInfo = null;
        this._locationInfo = null;
        this.state = {};
    }

    componentWillMount() {
        this._unsub = store.subscribe(() => {
            const needUpdate = this._updatePilotInfo() | this._updateShipInfo() | this._updateLocationInfo();
            if (needUpdate) this.setState(this.state);
        });
    }
    componentWillUnmount() {
        if (typeof this._unsub === 'function') this._unsub();
    }

    _updatePilotInfo() {
        const newPilotInfo = PilotInfoConnector.pilotInfo;
        if (this._pilotInfo === newPilotInfo) return false;
        this._pilotInfo = newPilotInfo;
        return true;
    }
    _updateShipInfo() {
        const newShipInfo = ShipInfoConnector.shipInfo;
        if (this._shipInfo === newShipInfo) return false;
        this._shipInfo = newShipInfo;
        return true;
    }
    _updateLocationInfo() {
        const newLocationInfo = LocationInfoConnector.locationInfo;
        if (this._locationInfo === newLocationInfo) return false;
        this._locationInfo = newLocationInfo;
        return true;
    }

    render() {
        const {className} = this.props;
        return (
            <div className={className + ' ' + styles.container}>
                <div className={styles.valueTitle}>Current credits</div>
                <div className={styles.value}>{PilotInfoConnector.credits}</div>
                <div className={styles.valueTitle}>Current system</div>
                <div className={styles.value}>{PilotInfoConnector.location.starSystem}</div>
                <div className={styles.valueTitle}>Current ship</div>
                <div className={styles.value}>{ShipInfoConnector.name + ' - ' + ShipInfoConnector.shipName}</div>
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
