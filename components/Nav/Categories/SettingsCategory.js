import React, { useState } from 'react'
import { settingItems } from '../../../helpers/stubs'
import styles from '../../../styles/nav/categories/SettingsCategory.module.scss'

const Card = ({ img, title = "", desc = ""}) => {

  const [selected, setSelected] = useState("Account")

  return (
    <div className={`${styles.cardWrapper} ${selected == title ? styles.selected : ""}`}>
      <div className={styles.cardIcon}>
        <img src={img} />
      </div>
      <p>{title} <span>{desc}</span></p>
    </div>
  )
}

const SettingsCategory = () => {
  return (
    <div className={styles.settingsCategoryContainer}>
      <h5>Settings</h5>
      { settingItems.map((items, i) => <Card key={i} img={items.img} title={items.title} desc={items.desc} />)}
    </div>
  );
};

export default SettingsCategory