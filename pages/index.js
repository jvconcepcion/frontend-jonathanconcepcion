import React, {useEffect, useState} from 'react'
import { getCookie, checkCookies  } from 'cookies-next'
import { baseCall } from '../helpers/api-fetcher'
import Head from 'next/head'
import NavComponent from '../components/Nav'
import MenuComponent from '../components/Nav/Menu'
import BannerComponent from '../components/Banner'
import FoodCategory from '../components/Nav/Categories/FoodCategory'
import NearbyRestaurants from '../components/NearbyRestaurant'
import ModalComponent from '../components/Modal'
import GroceryForm from '../components/Form/GroceryForm'
import OrderForm from '../components/Form/OrderForm'
import { Spinner, Offcanvas } from 'react-bootstrap'
import styles from '../styles/Main.module.scss'

export default function Home() {

  const [selectedCategories, setSelectedCategories] = useState([])
  const [groceries, setGroceries] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [userOrder, setUserOrder] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [notMounted, setNotMounted] = useState(true)
  const [modalConfig, setModalConfig] = useState({
    modalSize: 'sm',
    modalState: false,
    modalTitle: '',
    modalData: '',
    modalForComponent: ''
  })
  
  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

  const handleClickCategory = (val) => {
    if (!selectedCategories.includes(val)) {
      setSelectedCategories(res => ([...res, val]))
    } else {
      setSelectedCategories(res => ([...res.filter(res => res !== val)]))
    }
  }

  const getGrocery = async (data) => {
    let groceriesList = await baseCall(
      '/api/grocery',
      JSON.parse(data)?.refreshToken)
    setGroceries(prevState => ({...prevState, groceriesList}))
  }

  const getOrderByUserId = async (data) => {
    let orderList = await baseCall(
      '/api/order', 
      JSON.parse(data)?.refreshToken, 
      true, 
      `userId=${JSON.parse(data)?.userId}`)
    setUserOrder(prevState => ({...prevState, orderList}))
  }

  const handleAddOrder = (groceryId, orderName, price) => {
        setOrderItems(prevState => ([...prevState, 
      groceryId
    ]))
  }

  const handleModal = (title, bool, data = '', forComponent = '', size = 'sm') => {
    setModalConfig(prevState => ({...prevState, 
      modalSize: size,
      modalState: bool,
      modalTitle: title,
      modalData: data,
      modalForComponent: forComponent
    }))
  }

  useEffect(() => {
    const loginState = checkCookies(LOGIN_API_PATH)
    setNotMounted(false);
    if (loginState) {
      getGrocery(loginState)
      getOrderByUserId(loginState)
    }
  }, [])

  return !notMounted && checkCookies(LOGIN_API_PATH) ? (
    <div className={styles.MainContainer}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Technical Exam" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <div className={styles.navWrapper}>
        <NavComponent 
          orderItems={orderItems}
          userOrder={userOrder?.orderList} 
          burgerListAction={() => setOpenDrawer(true)} 
          handleModal={handleModal}
        />
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
        handleModal={handleModal}
      />
      <ModalComponent
        size={modalConfig.modalSize} 
        title={modalConfig.modalTitle}
        show={modalConfig.modalState} 
        handleClose={() => handleModal('', false, modalConfig.modalForComponent)} 
      >
        {modalConfig.modalForComponent === 'Grocery' ? (
          <GroceryForm title={modalConfig.modalTitle} modalData={modalConfig.modalData}/>
        ) : (<OrderForm orderItems={orderItems} />)}
      </ModalComponent>

      <Offcanvas 
        className={styles.drawer}
        placement='top'
        show={openDrawer} 
        onHide={() => setOpenDrawer(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <MenuComponent 
          type='mobile'
          orderItems={orderItems}
          userOrder={userOrder}
          handleModal={handleModal} 
        />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  ) : ( <div className={styles.spinnerWrapper}>
    <Spinner animation='border' variant='primary' size='xl'/>
  </div>)
}
