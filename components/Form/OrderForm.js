import { useRouter } from 'next/router'
import { sumObjValuesBy, orderComputation } from '../../helpers/utils'
import styles from '../../styles/nearbyrestaurant/OrderForm.module.scss'

const OrderForm = ({ orderItems, mode = 'review' }) => {

  const router = useRouter()
  const handleSubmit = () => {
    router.reload()
  }

  let quantity = sumObjValuesBy(orderItems, 'quantity')
  let total = sumObjValuesBy(orderItems, 'price')

  return (
    <div className={styles.oderFormContainer}>
      <div className={`${styles.item} ${styles.columnHeader}`}>
        <label>Product Name</label>
        <label>Quantity</label>
        <span className={styles.item_total}>Total</span>
      </div>
      {orderItems?.map((item, i) => (
        <div key={i} className={styles.item}>
          <label>{item.name}</label>
          <span className={styles.item_amount}>{item.quantity}</span>
          <span className={styles.item_total}>{item.price}</span>
        </div>
      ))}
      <div className={styles.totalPriceWrapper}>
        <label />
        <label>{quantity}</label>
        <label>{total}</label>
      </div>
      <div className={styles.vatableSaleWrapper}>
        <label />
        <label>With VAT</label>
        <label>{orderComputation(total).toFixed(1)}</label>
      </div>
      <div className={styles.btnWrapper}>
        {mode !== 'review' ? (
          <button onClick={handleDiscard} className={styles.discard}>Discard changes</button>
        ) : <div /> }
        <button onClick={handleSubmit} className={styles.save}>Submit</button>
      </div>
    </div>
  )
}

export default OrderForm