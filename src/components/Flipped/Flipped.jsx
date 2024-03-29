import React from 'react';
import { nanoid } from 'nanoid';
import styles from './Flipped.module.scss';
import FlippedItem from './FlippedItem/FlippedItem';
import FlippedItemLast from './FlippedItemLast/FlippedItemLast';
import { ciphersInfo } from './Flipped.constants';

export default function Flipped() {
  return (
    <ul key={nanoid()} className={styles.container}>
      {ciphersInfo.map((chiper, index) => {
        if (index < ciphersInfo.length - 1) {
          return <FlippedItem key={chiper.id} chiper={chiper} index={index} />;
        }
        return <FlippedItemLast key={nanoid()} />;
      })}
    </ul>
  );
}
