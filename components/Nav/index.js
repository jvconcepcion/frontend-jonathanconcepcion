import React from 'react'
import styles from '../../styles/nav/Nav.module.scss'
import SearchFieldComponent from './SearchField'
import MenuComponent from './Menu'
import SettingsComponent from './Settings'

const NavComponent = ({ 
  userOrder, 
  orderItems, 
  burgerListAction, 
  handleModal
 }) => {

  return (
    <ul className={styles.navContainer}>
      <li className={styles.searchContainer}>
        <SearchFieldComponent />
      </li>
      <li className={styles.menuContainer}>
        <MenuComponent 
          orderItems={orderItems}
          userOrder={userOrder}
          handleModal={handleModal} 
        />
      </li>
      <li className={styles.settingsContainer}>
        <SettingsComponent userOrder={userOrder} />
      </li>
      <li className={styles.burgerMenu} onClick={burgerListAction}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </div>
      </li>
    </ul>
  );
};

export default NavComponent;