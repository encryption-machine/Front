import React from 'react';
import styles from './FlippedItem.module.scss';
import SvgSelector from '../../SvgSelector/SvgSelector';

export default function FlippedItem({ chiper, index}) {
  return (
    <li className={styles.flippedItem} key={chiper.id}>
      <div className={`${styles.flippedItem_item} ${styles.flippedItem_front}`}>
        <h3 className={styles.flippedItem_front_name}>{chiper.name}</h3>
        <div className={styles.flippedItem_svg}>
          <SvgSelector name={chiper.name} />
        </div>
      </div>
      <div className={`${styles.flippedItem_item} ${styles.flippedItem_back}`}>
        {/* <h3 className={styles.flippedItem_back_name}>{chiper.name}</h3> */}
        <p className={styles.flippedItem_description}>{chiper.description}</p>
      </div>
    </li>
  );
}
