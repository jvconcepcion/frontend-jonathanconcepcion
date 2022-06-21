import React from 'react'
import styles from '../../styles/banner/Banner.module.scss'

const CustomBanner = ({ parentStyle, children, imgUrl = ''}) => {
  return (
    <div className={parentStyle}>
      <div className={styles.bannerHeader}>
        {children}
      </div>
      <span className={styles.imgWrapper}>
        <img src={imgUrl} />
      </span>
    </div>
  )
}

const BannerComponent = () => {
  return (
    <div className={styles.bannerContainer}>
      <CustomBanner 
        parentStyle={styles.dessertsBanner}
        imgUrl='/image/banner/desserts.png'
      >
        <h5>All deserts</h5>
        <p>Deserty</p>
        <h2>20% OFF</h2>
      </CustomBanner>
      <CustomBanner
        parentStyle={styles.burgersBanner}
        imgUrl='/image/banner/burgers.png'
      >
        <h5>Big Burgers</h5>
        <p>Fooddies</p>
        <h2>50% OFF</h2>
      </CustomBanner>
    </div>
  );
};

export default BannerComponent;