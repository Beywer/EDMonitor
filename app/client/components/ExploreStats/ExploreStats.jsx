import React from 'react';
import PropTypes from 'prop-types';
import ScansInfoConnector from "utils/model/scansInfo/ScansInfoConnector";
import styles from './ExploreStats.css';
import store from 'reduxStore/store';

export default class ExploreStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this._scansInfo = null;
    }

    componentWillMount() {
        this._unsub = store.subscribe(() => {
            const needUpdate = this._updateScansInfo();
            if (needUpdate) this.setState(this.state);
        });
    }
    componentWillUnmount() {
        if (typeof this._unsub === 'function') this._unsub();
    }

    _updateScansInfo() {
        const newScansInfo = ScansInfoConnector.scansInfo;
        if (this._scansInfo === newScansInfo) return false;
        this._scansInfo = newScansInfo;
        return true;
    }

    render() {
        const scansInfo = ScansInfoConnector.scansInfo.toJS();
        const planetClasses = Object.keys(scansInfo).sort();
        return (
            <div className={styles.container}>
                <div className={styles.totalCosts}>Total: {prettifyNumber(ScansInfoConnector.totalIncome)}</div>
                {planetClasses.map(planetClass => {
                    return (
                        <div key={planetClass}>
                            <div className={styles.valueTitle}>{planetClass}</div>
                            <div className={styles.value}>
                                <span className={styles.mainCount}>{scansInfo[planetClass].count}</span>
                                {' Terraform: '}{scansInfo[planetClass].terraformCount}</div>
                        </div>
                    )
                })}

            </div>
        );
    }
}

ExploreStats.propTypes = {};

ExploreStats.defaultProps = {};


function prettifyNumber(n) {
    const parts = [];
    while (n > 0) {
        const part = n % 1000;
        n = (n - part) / 1000;
        parts.unshift(part);
    }
    return parts.length > 0 ? parts.map(n => n.toString().padStart(3, '0')).join(' ') : 0;
}
