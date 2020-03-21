import React, { Component } from 'react';
import styles from './Footer.module.css';
import MsgAlert from '../MsgAlert/MsgAlert';

class Footer extends Component {
    render() {
        return (
            <footer className={styles.appBase}>
                <span>&copy; Myron R Schippers Jr</span>
                <MsgAlert />
            </footer>
        );
    }
}

export default Footer;
