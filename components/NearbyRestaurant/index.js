import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { deleteProduct } from '../../helpers/api-fetcher'
import styles from '../../styles/nearbyrestaurant/NearbyRestaurants.module.scss'

const RestaurantCards = ({ 
  id, 
  category, 
  name, 
  price, 
  vat, 
  orderItems, 
  handleAddOrder,
  handleModal
}) => {
  const router = useRouter()
  const [totalOrder, setTotalOrder] = useState(orderItems
    ?.filter(items => items?.groceryId === id)
    .length)

  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

  const addOrder = () => {
    handleAddOrder(id, name, price)
    setTotalOrder(prevState => prevState + 1)
    console.log(JSON.stringify(orderItems))
  }

  const handleDeleteProduct = () => {
    if(confirm('Are you sure you want to delete this product?')) {
      deleteProduct({id})
    }
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainer_imgWrapper}>
        <img src='/image/restaurants/sushi-banner.png' />
        {JSON.parse(getCookie(LOGIN_API_PATH))?.permissionLevel === 1 && (
          <div className={styles.editAndDelete}>
            <div onClick={() => handleModal('Edit Product', true, { id, category, name, price })} className={styles.edit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </div>
            <div onClick={handleDeleteProduct} className={styles.delete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className={styles.cardContainer_infoWrapper}>
        <div className={styles.nameAndAction}>
          <h6>{name}</h6>
          <span onClick={addOrder}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
            {totalOrder > 0 && (
              <div className={styles.totalOrderWrapper}>
                <span>
                  {orderItems?.filter(items => items?.groceryId === id).length}
                </span>
              </div>
            )}
          </span>
        </div>
        <div className={styles.additionalInfo}>
          <span className={styles.duration}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
            </svg>
            <p>40-60 min</p>
          </span>
          <img src='/image/restaurants/Ellipse1.png' />
          <span className={styles.price}><p>₱{price}</p></span>
        </div>
        <div className={styles.categoriesChipWrapper}><span>{category}</span></div>
      </div>
    </div>
  )
}

const NearbyRestaurants = ({ handleAddOrder, selectedCategories, groceries, orderItems, handleModal }) => {
  return (
    <div className={styles.nearbyRestaurantsContainer}>
      <div className={styles.headingWrapper}>
        <h5>Nearby restaurants</h5>
        <a onClick={() => handleModal('Add Product', true)} className={styles.addProduct}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </a>
      </div>
      <div className={styles.restaurantsContainer}>
        {groceries 
          ? groceries
            ?.grocery
            ?.filter(({ category }) => selectedCategories.length > 0 
              ? selectedCategories.includes(category)
              : category)
            .map(({ _id, name, category, price, __v}) => (
              <RestaurantCards 
                key={_id}
                id={_id}
                name={name}
                price={price}
                category={category}
                orderItems={orderItems}
                handleAddOrder={handleAddOrder}
                handleModal={handleModal}
              />))
          : "Loading..."
        }
      </div>
    </div>
  )
}

export default NearbyRestaurants;