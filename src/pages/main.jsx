import React from 'react';
import { Machine } from '../components/Machine/Machine';
import AboutCiphers from '../components/AboutCiphers/AboutCiphers';
import AboutProject from '../../src/components/AboutProject/AboutProject';
import OurTeam from '../components/OurTeam/OurTeam';
import {
  anyCharRegExp,
  caesarRegExp,
  morseInputCodeRegExp,
  morseInputTextRegExp,
  vigenereRegExp,
} from '../constants/regExp';

export const MainPage = () => {
  const dataMachine = [
    {
      name: 'Азбука Морзе',
      value: 'morse',
      length: 30,
      key: null,
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
      key: null,
      desc: 'любые символы в количестве от 1 до 30',
      validEncryption: anyCharRegExp,
      maxLengthEnc: 180,
      minLengthEnc: 1,
    },
    {
      name: 'AES (Advanced Encryption Standard)',
      value: 'aes',
      length: 30,
      key: null,
      desc: 'любые символы в количестве от 1 до 30',
      validEncryption: anyCharRegExp,
      validDecryption: anyCharRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 15000,
      minLengthDec: 1,
    },
    {
      name: 'Шифр Виженера',
      value: 'vigenere',
      length: 30,
      key: null,
      desc: 'русские буквы от А до Я (без ё) в количестве от 1 до 30',
      validEncryption: vigenereRegExp,
      validDecryption: vigenereRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 15000,
      minLengthDec: 1,
    },
    {
      name: 'Код Цезаря',
      value: 'caesar',
      length: 2,
      key: /^(([1-9]|1[0-4]|15)([,-](?=\d)|$))+$/,
      desc: 'только одно натуральное число от 1 до 15',
      validEncryption: caesarRegExp,
      validDecryption: caesarRegExp,
      maxLengthEnc: 2000,
      minLengthEnc: 1,
      maxLengthDec: 2000,
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
