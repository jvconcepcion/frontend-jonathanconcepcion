import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { removeSession } from '../../helpers/utils'
import { notifications } from '../../helpers/stubs'
import styles from '../../styles/account/settings/AccountForm.module.scss'

const CheckNotifications = ({ title = '' }) => {
  
  const [checked, setChecked] = useState(true)
  return (
    <div className={styles.notifWrapper_item}>
      <input type='checkbox' onChange={(e) => setChecked(e.target.checked)} checked={checked}/>
      <label>{title}</label>
    </div>
  )
}

const AccountForm = () => {

  const router = useRouter()
  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

  const handleLogout = () => {
    removeSession(LOGIN_API_PATH)
    router.push('/account/login')
  }
  
  return (
    <div className={styles.UpdateAccountContainer}>
      <h5>Account</h5>
      <div className={styles.personalInformation}>
        <h6>Personal information</h6>
        <p className={styles.avatarLabel}>Avatar</p>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <img src="/image/settings/huge-avatar.png"/>
          </div>
          <div className={styles.avatarAction}>
            <button className={styles.change}>Change</button>
            <button className={styles.remove}>Remove</button>
          </div>
        </div>
        <div className={styles.textFields}>
          <span className={styles.textFields_items}>
            <p>First name</p>
            <input type="text" placeholder='First name'/>
          </span>
          <span className={styles.textFields_items}>
            <p>Last name</p>
            <input type="text" placeholder='Last name'/>
          </span>
          <span className={styles.textFields_items}>
            <p>Email</p>
            <input type="email" placeholder='First name'/>
          </span>
          <span className={styles.textFields_items}>
            <p>Phone number</p>
            <input type="text" placeholder='Phone number'/>
          </span>
        </div>
        <h6>Email notifications</h6>
        <div className={styles.notifWrapper}>
          {notifications.map((item, i) => <CheckNotifications key={i} title={item} />)}
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={handleLogout} className={styles.btnWrapper_logout}>Log out</button>
          <div className={styles.btnWrapper_changes}>
            <button className={styles.discard}>Discard changes</button>
            <button className={styles.save}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountForm