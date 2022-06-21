import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { updateUser, registerUser } from '../../helpers/api-fetcher'
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

const AccountForm = ({ type = 'update' }) => {

  const router = useRouter()
  const fname = useRef(null)
  const lname = useRef(null)
  const email = useRef(null)
  const pass = useRef(null)
  const [accountInfo, setAccountInfo] = useState(null)
  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

  function handleRegister () {
    if(fname.current.value !== "" &&
        lname.current.value !== "" &&
        email.current.value !== "" &&
        pass.current.value !== "") {
          registerUser(accountInfo)
    } else {
      alert('Warning: Empty fields!')
    }
  }

  const handleOnChange = (e, fieldKey) => {
    if(e.target.value === ""){
      let filterOutThis = Object.keys(accountInfo)
      .filter((key) => key !== fieldKey)
      .reduce((cur, key) => { return Object.assign(cur, { [key]: accountInfo[key] })}, {})
      setAccountInfo(filterOutThis)
    } else {
        setAccountInfo(prevState => ({...prevState, [fieldKey]: e.target.value}))
    }
  }

  const handleDiscard = () => {
    fname.current.value = ""
    lname.current.value = ""
    email.current.value = ""
    pass.current.value = ""
    setAccountInfo(null)
  }

  const handleSubmit = () => {
    if(type === 'update') {
      if(accountInfo !== null) {
        if(confirm('Proceed to update?')) {
          updateUser(accountInfo)
          alert('Success')
        } 
      } else {
        alert('Warning: Empty fields!')
      }
    } else {
      handleRegister()
    }
  }

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
            <input ref={fname} type="text" placeholder='First name' onChange={(e) => handleOnChange(e, 'firstname')}/>
          </span>
          <span className={styles.textFields_items}>
            <p>Last name</p>
            <input ref={lname} type="text" placeholder='Last name'  onChange={(e) => handleOnChange(e, 'lastname')}/>
          </span>
          <span className={styles.textFields_items}>
            <p>Email</p>
            <input ref={email} type="email" placeholder='Email' onChange={(e) => handleOnChange(e, 'email')}/>
          </span>
          <span className={styles.textFields_items}>
            <p>Password</p>
            <input ref={pass} type="password" placeholder='Password' onChange={(e) => handleOnChange(e, 'password')}/>
          </span>
        </div>
        <h6>Email notifications</h6>
        <div className={styles.notifWrapper}>
          {notifications.map((item, i) => <CheckNotifications key={i} title={item} />)}
        </div>
        <div className={styles.btnWrapper}>
          {type === 'update' && (
            <button onClick={handleLogout} className={styles.btnWrapper_logout}>Log out</button>
          )}
          <div className={styles.btnWrapper_changes}>
            <button onClick={handleDiscard} className={styles.discard}>Discard changes</button>
            <button onClick={handleSubmit} className={styles.save}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountForm