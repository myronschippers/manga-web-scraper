import React, { Component } from 'react';
import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import SearchField from '../SearchField/SearchField';

class Header extends Component {
  render() {
    return (
      <header className={styles.appBar}>
        <div className={styles['appBar-primary']}>
          <h1 className={styles.appBarHdg}>{this.props.primeHdg}</h1>
        </div>
        <div className={styles['appBar-block']}>
          <SearchField type="redirect" />
        </div>
        <div className={styles['appBar-block']}>
          <Navigation />
        </div>
      </header>
    );
  }
}

export default Header;
