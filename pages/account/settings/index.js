import React, { useEffect, useState } from 'react'
import { checkCookies  } from 'cookies-next'
import { baseCall } from '../../../helpers/api-fetcher'
import Head from 'next/head'
import NavComponent from '../../../components/Nav'
import SettingsCategory from '../../../components/Nav/Categories/SettingsCategory'
import AccountForm from '../../../components/Form/AccountForm'
import Spinner from 'react-bootstrap/Spinner'
import styles from '../../../styles/account/settings/AccountSettings.module.scss'

const AccountSettings = () => {

  const [userOrder, setUserOrder] = useState([])
  const [notMounted, setNotMounted] = useState(true);

  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

  const getOrderByUserId = async (data) => {
    let orderList = await baseCall(
      '/api/order', 
      JSON.parse(data)?.refreshToken, 
      true, 
      `userId=${JSON.parse(data)?.userId}`)
    setUserOrder(prevState => ({...prevState, orderList}))
  }

  useEffect(() => {
    const loginState = checkCookies(LOGIN_API_PATH)
    setNotMounted(false);
    if (loginState) getOrderByUserId(loginState)
  }, [])

  return !notMounted && checkCookies(LOGIN_API_PATH) ? (
    <div className={styles.accountSettingsContainer}>
      <Head>
        <title>Account Setting</title>
        <meta name="description" content="Technical Exam" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>

      <div className={styles.navWrapper}>
        <NavComponent userOrder={userOrder?.orderList} burgerListAction={() => console.log("test")} />
      </div>

      <div className={styles.grid}>
        <SettingsCategory />
        <AccountForm type="update" />
      </div>
    </div>
  ) : ( <div className={styles.spinnerWrapper}>
    <Spinner animation='border' variant='primary' size='xl'/>
  </div>)
}

export default AccountSettings