import React, {useEffect, useState} from 'react'
import { getCookie, checkCookies  } from 'cookies-next';
import { baseCall } from '../helpers/api-fetcher'
import Head from 'next/head'
import NavComponent from '../components/Nav'
import BannerComponent from '../components/Banner'
import FoodCategory from '../components/Nav/Categories/FoodCategory'
import NearbyRestaurants from '../components/NearbyRestaurant'
import styles from '../styles/Main.module.scss'

export default function Home() {

  const [selectedCategories, setSelectedCategories] = useState([])
  const [groceries, setGroceries] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [userOrder, setUserOrder] = useState([])
  
  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`
  const GROCERY_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GROCERIES_PATH}`
  const GET_ORDER_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ORDER_PATH}`

  const handleClickCategory = (val) => {
    if (!selectedCategories.includes(val)) {
      setSelectedCategories(res => ([...res, val]))
    } else {
      setSelectedCategories(res => ([...res.filter(res => res !== val)]))
    }
  }

  const getGrocery = async (data) => {
    let groceriesList = await baseCall(
      GROCERY_API_PATH,
      JSON.parse(data)?.refreshToken)
    setGroceries(prevState => ({...prevState, groceriesList}))
  }

  const getOrderByUserId = async (data) => {
    let orderList = await baseCall(
      GET_ORDER_API_PATH, 
      JSON.parse(data)?.refreshToken, 
      true, 
      `userId=${JSON.parse(data)?.userId}`)
    setUserOrder(prevState => ({...prevState, orderList}))
  }

  const handleAddOrder = (groceryId, orderName, price) => {
    const loginState = JSON.parse(getCookie(LOGIN_API_PATH))

    setOrderItems(prevState => ([...prevState, 
      {groceryId,
      userId: loginState.userId,
      orderName,
      price}
    ]))
  }

  useEffect(() => {
    const loginState = checkCookies(LOGIN_API_PATH)

    if (loginState) {
      getGrocery(loginState)
      getOrderByUserId(loginState)
    }
  }, [])

  return (
    <div className={styles.MainContainer}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Technical Exam" />
      </Head>

      <div className={styles.navWrapper}>
        <NavComponent userOrder={userOrder?.orderList} burgerListAction={() => console.log("test")} />
      </div>

      <BannerComponent />
      <FoodCategory 
        selectedCategories={selectedCategories}
        setSelectedCategories={handleClickCategory} />
      <NearbyRestaurants 
        handleAddOrder={handleAddOrder} 
        selectedCategories={selectedCategories}
        groceries={groceries?.groceriesList}
        orderItems={orderItems}
      />
    </div>
  )
}
