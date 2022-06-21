import React, { useState } from 'react'
import styles from '../../styles/nearbyrestaurant/NearbyRestaurants.module.scss'

const RestaurantCards = ({ 
  id, 
  category, 
  name, 
  price, 
  vat, 
  orderItems, 
  handleAddOrder
}) => {
  const [totalOrder, setTotalOrder] = useState(orderItems
    ?.filter(items => items?.groceryId === id)
    .length)

  const addOrder = () => {
    handleAddOrder(id, name, price)
    setTotalOrder(prevState => prevState + 1)
    console.log(JSON.stringify(orderItems))
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainer_imgWrapper}>
        <img src='/image/restaurants/sushi-banner.png' />
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

const NearbyRestaurants = ({ handleAddOrder, selectedCategories, groceries, orderItems }) => {
  return (
    <div className={styles.nearbyRestaurantsContainer}>
      <h5>Nearby restaurants</h5>
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
              />))
          : "Loading..."
        }
      </div>
    </div>
  )
}

export default NearbyRestaurants;