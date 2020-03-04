import React, { Component } from 'react';

// custom styling
import styles from './Panel.module.css';

class Panel extends Component {
    render() {
        return (
            <div className={styles.panel}>
                {this.props.children}
            </div>
        );
    }
}

export default Panel;
