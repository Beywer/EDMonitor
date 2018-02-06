import React from 'react';
import PropTypes from 'prop-types';
import styles from './Journal.css';
import {socket} from 'utils/socketUtils';
import {INIT_DATA, SHIP_INFO_UPDATE, PILOT_INFO_UPDATE} from 'common/socketConstants';

export default class Journal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {lines: []};
        // this._handleNewLinesReceive = this._handleNewLinesReceive.bind(this);
    }

    componentWillMount() {
        socket.on(INIT_DATA, (data) => console.log(data));
        socket.on(SHIP_INFO_UPDATE, (data) => console.log(data));
        socket.on(PILOT_INFO_UPDATE, (data) => console.log(data));
    }
    componentWillUnMount() {
    }

    // _handleNewLinesReceive(newLines) {
    //     newLines = Array.isArray(newLines) ? newLines : [newLines];
    //     newLines = newLines.reverse().map(line => {
    //         const parsed = JSON.parse(line);
    //         parsed.id = Math.random().toString(36).slice(2);
    //         return parsed;
    //     });
    //     newLines = newLines.concat(this.state.lines);
    //     this.setState({lines: newLines});
    // }

    render() {
        const {lines} = this.state;
        return (
            <div className={styles.eventsList} ref={'list'}>
                {
                    lines.map(line => <div key={line.id} className={styles.event}>{JSON.stringify(line)}</div>)
                }
            </div>
        );
    }
}

Journal.propTypes = {};

Journal.defaultProps = {};
