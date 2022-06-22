import React from 'react'
import Link from 'next/link'
import styles from '../../styles/nav/Menu.module.scss'
import { useRouter } from 'next/router'

const MenuComponent = ({ type = 'desktop', orderItems, userOrder, handleModal }) => {

  const router = useRouter()

  const handleMyOrder = () => handleModal('Order list', true, orderItems, 'My Order', 'sm')
  
  return (
    <ul className={`${styles.menuContainer} ${type === 'mobile' ? styles.mobile : ''}`}>
      <li className={router.pathname === "/" ? styles.selected : ""}>
        <Link href="/">
          <a>Restaurants</a>
        </Link>
      </li>
      <li>
        <a>Deals</a>
      </li>
      <li>
        <a onClick={handleMyOrder}>My orders</a>
      </li>
    </ul>
  );
};

export default MenuComponent;