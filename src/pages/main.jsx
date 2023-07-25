import React from 'react';
import { Machine } from '../components/Machine/Machine';
import AboutCiphers from '../components/AboutCiphers/AboutCiphers';
import AboutProject from '../../src/components/AboutProject/AboutProject';
import OurTeam from '../components/OurTeam/OurTeam';
import {
  morseInputCodeRegExp,
  morseInputTextRegExp,
} from '../constants/regExp';

export const MainPage = () => {
  const dataMachine = [
    {
      name: 'Азбука Морзе',
      value: 'morse',
      length: 30,
      desc: 'любые символы в количестве от 1 до 30',
      validEncryption: morseInputTextRegExp,
      validDecryption: morseInputCodeRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 15000,
      minLengthDec: 1,
    },
    {
      name: 'QR код',
      value: 'qr',
      length: 30,
      desc: 'любые символы в количестве от 1 до 30',
      validEncryption: morseInputTextRegExp,
      validDecryption: morseInputCodeRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 15000,
      minLengthDec: 1,
    },
    {
      name: 'AES (Advanced Encryption Standard)',
      value: 'aes',
      length: 30,
      desc: 'любые символы в количестве от 1 до 30',
      validEncryption: morseInputTextRegExp,
      validDecryption: morseInputCodeRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 15000,
      minLengthDec: 1,
    },
    {
      name: 'Шифр Виженера',
      value: 'vigenere',
      length: 30,
      desc: 'английские буквы от A до Z, русские буквы от А до Я (без ё) в количестве от 1 до 30',
      validEncryption: morseInputTextRegExp,
      validDecryption: morseInputCodeRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 15000,
      minLengthDec: 1,
    },
    {
      name: 'Код Цезаря',
      value: 'caesar',
      length: 2,
      desc: 'Допустимые символы: только одно натуральное число от 1 до 15',
      validEncryption: morseInputTextRegExp,
      validDecryption: morseInputCodeRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 15000,
      minLengthDec: 1,
    },
  ];
  return (
    <>
      <Machine list={dataMachine} />
      <AboutCiphers />
      <AboutProject />
      <OurTeam />
    </>
  );
};
