import React from 'react';
import styles from './SideHeader.module.css';
import logo from '../../assets/cal-logo.jpg';

import { Link } from 'react-router-dom';

const SideHeader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar_logo_container}>
                <img className={styles.logo} src={logo} alt="logo" />
                <h2>Expenses Menu</h2>
            </div>
            <div className={styles.menu}>
                <p>Pages</p>
                <ul>
                    <li>
                        <Link to="/" className={styles.sidebar_link}>Home</Link>
                    </li>
                    <li>
                        <Link to="/stats" className={styles.sidebar_link}>Stats</Link>
                    </li>
                    <li>
                        <Link to="/aboutus" className={styles.sidebar_link}>About Us</Link>
                    </li>
                </ul>
                <p>*Actions</p>
                <button className={styles.menu_btn}>Add Project</button>
            </div>

        </div>
    )
}

export default SideHeader