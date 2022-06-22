import CarouselComponent from '.'
import styles from '../../styles/carousel/AdComponent.module.scss'

const AdsComponent = () => {
  return (
    <div className={styles.adContainer}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardWrapper_rating}>
          <div className={styles.cardWrapper_rating_header}>
            <h6>Overall rating</h6>
            <span>
              <label className={styles.rate}>4.2</label>
              <span className={styles.stars}>
                <img src='/image/banner/blue-star.png' />
                <img src='/image/banner/blue-star.png' />
                <img src='/image/banner/blue-star.png' />
                <img src='/image/banner/gray-star.png' />
                <img src='/image/banner/gray-star.png' />
              </span>
              <label className={styles.numVote}>3 votes</label>
              <button>Leave review</button>
            </span>
          </div>
          <div className={styles.cardWrapper_rating_body}>
            <select
              // ref={categoryName}
              // className={styles.category}
              name='category'
              form='categoryform'
            // value={category}
            >
              <option
              // key={item}
              // value={item}
              >Sort by: <span className={styles.optionHiglight}>Newest first</span></option>
            </select>
          </div>
        </div>
        <div className={styles.cardWrapper_productInfo_one}>test</div>
        <div className={styles.cardWrapper_productInfo_two}>test</div>
      </div>
    </div>
  )
}

export default AdsComponent