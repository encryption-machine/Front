import React from 'react';
import styles from './FlippedItem.module.scss';
import SvgSelector from '../../SvgSelector/SvgSelector';

export default function FlippedItem({ id, name, description }) {
  return (
    <li className={styles.flippedItem} key={id}>
      <div className={`${styles.flippedItem_item} ${styles.flippedItem_front}`}>
        <h3 className={styles.flippedItem_front_name}>{name}</h3>
        <div className={styles.flippedItem_svg}>
          <SvgSelector name={name} />
        </div>
      </div>
      <div className={`${styles.flippedItem_item} ${styles.flippedItem_back}`}>
        <h3 className={styles.flippedItem_back_name}>{name}</h3>
        <p className={styles.flippedItem_description}>{description}</p>
      </div>
    </li>
  );
}
