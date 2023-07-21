import React from 'react';
import { Machine } from '../components/Machine/Machine';
import AboutCiphers from '../components/AboutCiphers/AboutCiphers';
import AboutProject from '../../src/components/AboutProject/AboutProject';
import OutTeam from '../components/OurTeam/OurTeam';

export const MainPage = () => {
  //Это позже удалим
  const dataMachine = [
    'Азбука Морзе',
    'QR код',
    'AES (Advanced Encryption Standard)',
    'Шифр Виженера',
    'DSA (Digital Signature Algorithm)',
    'Код Цезаря',
  ];
  return (
    <>
      <Machine list={dataMachine} />
      <AboutCiphers />
      <AboutProject />
      <OutTeam />
    </>
  );
};
