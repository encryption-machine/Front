import React from 'react';
import styles from './Flipped.module.scss';
import FlippedItem from './FlippedItem/FlippedItem';
import FlippedItemLast from './FlippedItemLast/FlippedItemLast';

export default function Flipped({ ciphersInfo }) {
  return (
    <ul className={styles.container}>
      {ciphersInfo.map((chiper, index) => {
        if (index < ciphersInfo.length - 1) {
          return <FlippedItem key={chiper.id} chiper={chiper} index={index} />;
        }
        return <FlippedItemLast />;
      })}
    </ul>
  );
}
