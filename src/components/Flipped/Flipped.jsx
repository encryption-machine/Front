import React from 'react';
import styles from './Flipped.module.scss';
import FlippedItem from './FlippedItem/FlippedItem';

export default function Flipped({ ciphersInfo }) {
  return (
    <ul className={styles.container}>
      {ciphersInfo.map(({ id, name, description }) => (
        <FlippedItem key={id} name={name} description={description} />
      ))}
    </ul>
  );
}
