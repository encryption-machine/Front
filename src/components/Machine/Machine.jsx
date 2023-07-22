import React, { useRef, useEffect, useState, useMemo } from 'react';
import QRCode from 'react-qr-code';
import { copyToClipboard } from '../../helpers';
import SecretKeyModal from '../SecretKeyModal/SecretKeyModal';
import FormButton from '../FormButton/FormButton';
import styles from './Machine.module.scss';
import CopyMark from '../CopyMark/CopyMark';
import * as apiMachine from '../../utils/apiMachine';
import { observer } from 'mobx-react-lite';
import { SecretKeyGlobalStore as secretStore } from '../../stores';
import { Button } from '../Button/Button';

export const Machine = observer(({ list }) => {
  const [current, setCurrent] = React.useState('encryption');
  const [isSelectOpen, setSelectOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('Выберите язык шифрования');
  const [type, setType] = React.useState('');
  const [filteredList, setFilteredList] = React.useState(
    list.filter((item) => item !== selected)
  );
  const [result, setResult] = React.useState('');
  const [isCopyShow, setIsCopyShow] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [encryption, SetEncryption] = useState('');
  const [secretKey, SetSecretKeyValue] = useState('');
  const [keyLength, SetKeyLength] = useState(30);
  const [qrResult, SetQrResult] = useState('');
  const [qrCopy, SetQrCopy] = useState(false);
  const [encryptionTextLength, SetEncryptionTextLength] = useState(2000);
  const [descKey, SetEncKey] = useState('');
  const [minHeight, SetMinHeight] = useState(250);
  const selectRef = useRef(null);
  const activeClass = styles.tabActive;

  const clickTab = (e) => {
    setCurrent(e.target.value);
  };

  const selectClick = () => {
    const hideBlock = document.getElementById('hide');
    const height =
      'height: ' + document.getElementById('list').offsetHeight + 'px';

    if (isSelectOpen) {
      hideBlock.setAttribute('style', 'height:0px');
    } else {
      hideBlock.setAttribute('style', height);
    }
    setSelectOpen(!isSelectOpen);
  };

  const choiceType = (e, value) => {
    setSelected(value.name);
    setType(value.value);
    SetKeyLength(value.length);
    setFilteredList(list.filter((item) => item.name !== value.name));
    SetEncKey(value.desc);
    if (value.value === 'qr') {
      setCurrent('encryption');
      SetEncryptionTextLength(300);
    } else {
      SetEncryptionTextLength(2000);
    }
    selectClick();
  };

  const handleEncrypt = (e) => {
    apiMachine
      .getEncryption(
        encryption,
        type,
        secretStore.secretKeyText,
        current === 'encryption'
      )
      .then((response) => {
        if (response) {
          if (type === 'qr') {
            SetQrResult(response.encrypted_text);
            secretStore.setOpenSecretModal(true);
          } else {
            setResult(response.encrypted_text);
          }
          SetSecretKeyValue('');
          secretStore.setSecretKeyText('');
        } else {
          console.error('ошибка  при шифровании');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const copyCode = () => {
    try {
      copyToClipboard(result);
      setCopyMessage('Результат скопирован');
    } catch (error) {
      setCopyMessage('Неудалось скопировать');
    } finally {
      showMessage();
    }
  };

  const showMessage = () => {
    setIsCopyShow(true);
    setTimeout(() => {
      setIsCopyShow(false);
    }, 2000);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (
        isSelectOpen &&
        selectRef.current &&
        !selectRef.current?.contains(event.target)
      ) {
        selectClick();
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  const secretKeyClick = () => {
    setResult('');
    if (type !== 'morse' && type !== 'qr') {
      secretStore.setOpenSecretModal(true);
    } else {
      handleEncrypt();
    }
  };

  const setSecretKey = (e) => {
    secretStore.setSecretKeyText(secretKey);
    secretStore.setOpenSecretModal(false);
    handleEncrypt();
  };

  const handleEncryptionValue = (e) => {
    SetEncryption(e.target.value.slice(0, encryptionTextLength));
  };

  const lengthOfText = useMemo(() => {
    return encryption.length ? encryption.length : 0;
  }, [encryption]);

  const handleChangeKey = (e) => {
    SetSecretKeyValue(e.target.value.slice(0, keyLength));
  };

  const copyQrClick = () => {
    SetQrCopy(true);
    copyToClipboard(qrResult);
    setTimeout(() => {
      secretStore.setOpenSecretModal(false);
      SetQrResult('');
      SetQrCopy(false);
    }, 2000);
  };

  const selectClasses = !isSelectOpen
    ? styles.select
    : `${styles.select__open} ${styles.select}`;

  const copyClasses = !isCopyShow
    ? styles.copy__message
    : `${styles.copy__messageShow} ${styles.copy__message}`;

  return (
    <section className={styles.machine} id="ciphers">
      <div className={styles.content}>
        <div className={styles.switch}>
          <button
            className={`${styles.tab} ${
              current === 'encryption' ? activeClass : ''
            }`}
            value="encryption"
            onClick={(e) => clickTab(e)}
          >
            Шифрование
          </button>
          <button
            className={`${styles.tab} ${
              current === 'decryption' ? activeClass : ''
            }`}
            value="decryption"
            onClick={clickTab}
            disabled={type === 'qr'}
          >
            Дешифрование
          </button>
        </div>
        <div>
          <div className={selectClasses} ref={selectRef}>
            <div className={styles.select__title} onClick={selectClick}>
              {selected}
              <div className={styles.select__icon}>
                <div className="icon-check"></div>
              </div>
            </div>
            <div className={styles.select__hide} id="hide">
              <ul className={styles.select__list} id="list">
                {filteredList.map((item) => (
                  <li
                    key={item.value}
                    className={styles.select__option}
                    onClick={(event) => choiceType(event, item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copy__cont}>
          <textarea
            name="leftArea"
            id="leftArea"
            className={styles.text}
            placeholder="Исходный текст "
            value={encryption}
            onInput={(event) => handleEncryptionValue(event)}
          />
          <div className={styles.count}>
            {lengthOfText} / {encryptionTextLength}
          </div>
        </div>
        <div className={styles.copy__cont}>
          <div className={copyClasses}>{copyMessage}</div>
          <textarea
            name="rightArea"
            id="rightArea"
            className={styles.text}
            placeholder="Результат"
            defaultValue={result}
            readOnly
            style={{ minHeight: minHeight }}
          />
          <button
            disabled={isCopyShow}
            onClick={copyCode}
            className={styles.copy__button}
          >
            <CopyMark />
          </button>
        </div>
        <div className={styles.machine__button}>
          <Button
            onClick={(e) => secretKeyClick(e)}
            disabled={!encryption.length || !type.length}
            className={styles.button}
          >
            Запустить
          </Button>
        </div>
      </div>
      <SecretKeyModal
        isOpen={secretStore.openSecretKeyModal}
        setIsOpen={secretStore.setOpenSecretModal}
      >
        <div className={styles.modal}>
          {!qrResult.length && (
            <div className={styles.modal__key}>
              <div className={styles.modal__title}>Ввод секретного ключа</div>
              <div className={styles.modal__form}>
                <div className={styles.modal__item}>
                  <input
                    type="text"
                    placeholder="Секретный ключ"
                    className={styles.modal__input}
                    value={secretKey}
                    onChange={handleChangeKey}
                  />
                </div>
                <div className={styles.modal__item}>
                  <FormButton
                    onClick={(e) => setSecretKey(e)}
                    disabled={secretKey.length === 0}
                  >
                    Ввести
                  </FormButton>
                </div>
                <div className={styles.modal__desc}>
                  Для данного шифра необходимо ввести ключ.
                  <div>
                    Использовать можно:
                    <div>{descKey}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {qrResult.length > 1 && (
            <div className={styles.modal__qr}>
              <div className={styles.modal__title}>QR код</div>
              {!qrCopy && <QRCode value={qrResult} />}
              {qrCopy && (
                <div className={styles.modal__desc}>Код с копирован</div>
              )}
              <div className={styles.modal__item}>
                <FormButton onClick={() => copyQrClick()} disabled={qrCopy}>
                  Копировать
                </FormButton>
              </div>
            </div>
          )}
        </div>
      </SecretKeyModal>
    </section>
  );
});
