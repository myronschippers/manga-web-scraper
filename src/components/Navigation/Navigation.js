import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';
import mainNavConfig from '../../constants/mainNav.config';

function Navigation (props) {
  return (
    <ul className={styles.nav}>
      {mainNavConfig.map((navItem, index) => (
        <li key={index}>
          <Link to={navItem.path}>{navItem.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
