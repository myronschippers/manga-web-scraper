import React, { Component } from 'react';
import styles from './Header.module.css';

class Header extends Component {
    render() {
        return (
            <header className={styles.appBar}>
                <h1 className={styles.appBar_hdg}>{this.props.primeHdg}</h1>
            </header>
        );
    }
}

export default Header;
