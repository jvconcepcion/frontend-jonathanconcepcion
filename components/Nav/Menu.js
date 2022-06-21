import React from 'react'
import Link from 'next/link'
import styles from '../../styles/nav/Menu.module.scss'
import { useRouter } from 'next/router'

const MenuComponent = () => {

  const router = useRouter()
  
  return (
    <ul className={styles.menuContainer}>
      <li className={router.pathname === "/" ? styles.selected : ""}>
        <Link href="/">
          <a>Restaurants</a>
        </Link>
      </li>
      <li>
        <Link href="#Deals">
          <a>Deals</a>
        </Link>
      </li>
      <li>
        <Link href="#My orders">
          <a>My orders</a>
        </Link>
      </li>
    </ul>
  );
};

export default MenuComponent;