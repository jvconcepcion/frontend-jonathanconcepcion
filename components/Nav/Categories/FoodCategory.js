import React, { useState } from 'react'
import styles from '../../../styles/nav/categories/FoodCategory.module.scss'
import { foodItems } from '../../../helpers/stubs'

const CardButton = ({ imgUrl = '', label = '', selectedCategories, setSelectedCategories }) => {
  const [ifSelected, setIfSelected] = useState(false)
  let categories = [ ...new Set(selectedCategories)]
  const handleClick = () => {
    if (!ifSelected) {
      setIfSelected(true)
      setSelectedCategories(label)
    } else {
      setIfSelected(false)
      setSelectedCategories(label)
    }
  }

  return (
    <div onClick={handleClick} className={`${styles.cardWrapper} ${ifSelected ? styles.selected : ''}`}>
      <span className={styles.cardWrapper_img}>
        <img src={imgUrl} />
      </span>
      <span className={styles.cardWrapper_label}>
        {label}
      </span>
    </div>
  )
}

const FoodCategory = ({ selectedCategories, setSelectedCategories }) => {
  return (
    <div className={styles.foodCategoryContainer}>
      {foodItems.map(items => <CardButton
        key={items.title} 
        imgUrl={items.img} 
        label={items.title}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />)}
    </div>
  )
};

export default FoodCategory;