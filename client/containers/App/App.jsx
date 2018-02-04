import Journal from "components/Journal/Journal";
import MenuPanel from "containers/MenuPanel/MenuPanel";
import React from 'react';
import styles from './App.css';

export default class App extends React.Component {

    render() {
        return (
            <div className={styles.app}>
                <MenuPanel/>
                <div className={styles.workArea}>
                    <Journal/>
                </div>
            </div>
        );
    }
}
