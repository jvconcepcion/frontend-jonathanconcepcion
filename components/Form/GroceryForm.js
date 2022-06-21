import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { addProduct, updateGrocery } from '../../helpers/api-fetcher'
import styles from '../../styles/nearbyrestaurant/GroceryForm.module.scss'

const GroceryForm = ({ 
  title = 'Edit Product',
  modalData = { 
    category: "",
    id: "",
    name: "",
    price: ""}
}) => {
  const router = useRouter()
  const productName = useRef(null)
  const categoryName = useRef(null)
  const productPrice = useRef(null)
  const [productInfo, setProductInfo] = useState(modalData)

  const { category, id, name, price} = productInfo

  function handleRegister () {
    if(categoryName.current.value !== "-------" &&
    productName.current.value !== "" &&
    productPrice.current.value !== ""
    ) {
      addProduct(productInfo)
      alert(`Success: ${productName.current.value} Added!`)
      router.reload()
    } else {
      alert('Warning: Empty fields!')
    }
  }

  const handleOnChange = (e, fieldKey) => {
    if(e.target.value === ""){
      let filterOutThis = Object.keys(productInfo)
      .filter((key) => key !== fieldKey)
      .reduce((cur, key) => { return Object.assign(cur, { [key]: productInfo[key] })}, {})
      setProductInfo(filterOutThis)
    } else {
      setProductInfo(prevState => ({...prevState, [fieldKey]: e.target.value}))
    }
  }

  const handleDiscard = () => {
    if(title === 'Edit Product') {
      productName.current.value = modalData.name
      categoryName.current.value = modalData.category
      productPrice.current.value = modalData.price
      setProductInfo(modalData)
    } else {
      productName.current.value = ""
      productPrice.current.value = ""
      setProductInfo(modalData)
    }
  }

  const handleSubmit = () => {
    if(title === 'Edit Product') {
      if(category !== "-------" &&
      price && 
      name
      ) {
        updateGrocery(productInfo)
        alert("Success!")
        router.reload()
      } else {
        alert('Warning: Empty fields!')
      }
    } else {
      handleRegister()
    }
  }

  return (
    <div className={styles.groceryFormContainer}>
      <div className={styles.textFields}>
        <span className={styles.textFields_items}>
          <label>Product Name</label>
          <input 
            ref={productName} 
            type="text" 
            placeholder='Product Name' 
            defaultValue={name}
            onChange={(e) => handleOnChange(e, 'name')}
          />
        </span>
        <span className={styles.textFields_items}>
          <label>Category</label>
          <select 
            ref={categoryName} 
            className={styles.category} 
            name='category' 
            form='categoryform'
            onChange={(e) => handleOnChange(e, 'category')}
            value={category}
          >
            {['-------', 'Pizza', 'Burger', 'BBQ', 'Sushi', 'Fruits', 'Desserts'].map(item => (
              <option 
                key={item} 
                value={item} 
              >{item}</option>
            ))}
          </select>
        </span>
        <span className={styles.textFields_items}>
          <label>Price</label>
          <input 
            ref={productPrice} 
            type="number" 
            placeholder='eg. 100' 
            min="1" 
            step="1" 
            max="9999" 
            defaultValue={price}
            onChange={(e) => handleOnChange(e, 'price')}
          />
        </span>
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={handleDiscard} className={styles.discard}>Discard changes</button>
        <button onClick={handleSubmit} className={styles.save}>Save changes</button>
      </div>
    </div>
  )
}

export default GroceryForm