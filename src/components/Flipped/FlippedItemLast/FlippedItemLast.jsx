import React from 'react';
import { nanoid } from 'nanoid';
import styles from './FlippedItemLast.module.scss';

export default function FlippedItemLast() {
  return <div key={nanoid()} className={styles.flippedItemLast}></div>;
}
