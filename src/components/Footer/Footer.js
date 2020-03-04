import React, { Component } from 'react';
import styles from './Footer.module.css';

class Footer extends Component {
    render() {
        return (
            <footer className={styles.appBase}>
                &copy; Myron R Schippers Jr
            </footer>
        );
    }
}

export default Footer;
