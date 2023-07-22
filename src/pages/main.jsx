import React from 'react';
import { Machine } from '../components/Machine/Machine';
import AboutCiphers from '../components/AboutCiphers/AboutCiphers';
import AboutProject from '../../src/components/AboutProject/AboutProject';

export const MainPage = () => {
  const dataMachine = [
    { name: 'Азбука Морзе', value: 'morse', length: 30 },
    { name: 'QR код', value: 'qr', length: 30 },
    { name: 'AES (Advanced Encryption Standard)', value: 'aes', length: 30 },
    { name: 'Шифр Виженера', value: 'vigenere', length: 30 },
    { name: 'Код Цезаря', value: 'caesar', length: 2 },
  ];
  return (
    <>
      <Machine list={dataMachine} />
      <AboutCiphers />
      <AboutProject />
    </>
  );
};
