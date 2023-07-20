import React from 'react';
import { Machine } from '../components/Machine/Machine';
import AboutCiphers from '../components/AboutCiphers/AboutCiphers';
import AboutProject from '../../src/components/AboutProject/AboutProject';

export const MainPage = () => {
  const dataMachine = [
    { name: 'Азбука Морзе', value: 'morse' },
    { name: 'QR код', value: 'qr' },
    { name: 'AES (Advanced Encryption Standard)', value: 'aes' },
    { name: 'Шифр Виженера', value: 'vigenere' },
    { name: 'Код Цезаря', value: 'caesar' },
  ];
  return (
    <>
      <Machine list={dataMachine} />
      <AboutCiphers />
      <AboutProject />
    </>
  );
};
