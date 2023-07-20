import React, { useRef, useEffect, useState, useMemo } from 'react';
import { copyToClipboard } from '../../helpers';
import { AppButton } from '../AppButton/AppButton';
import SecretKeyModal from '../SecretKeyModal/AuthModal';
import FormButton from '../FormButton/FormButton';
import styles from './Machine.module.scss';
import CopyMark from '../CopyMark/CopyMark';
import * as apiMachine from '../../utils/apiMachine';
import { observer } from 'mobx-react-lite';
import { SecretKeyGlobalStore as secretStore } from '../../stores';

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
  const selectRef = useRef(null);
  const activeClass = styles.tabActive;

  const clickTab = (event) => {
    setCurrent(event.target.value);
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
    console.log(type);
    setFilteredList(list.filter((item) => item.name !== value.name));
    selectClick();
  };

  const handleEncrypt = (e) => {
    console.log(type);
    apiMachine
      .getEncryption(
        encryption,
        type,
        secretStore.secretKeyText,
        current === 'encryption'
      )
      .then((response) => {
        if (response) {
          setResult(response.encrypted_text);
        } else {
          console.error('ошибка  при шифровании');
        }
      })
      .catch((err) => {
        console.log('ads');
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
    secretStore.setOpenSecretModal(true);
  };

  const setSecretKey = (e) => {
    secretStore.setSecretKeyText(secretKey);
    secretStore.setOpenSecretModal(false);
  };

  const handleEncryptionValue = (e) => {
    SetEncryption(e.target.value);
  };

  const lengthOfText = useMemo(() => {
    return encryption.length ? encryption.length : 0;
  }, [encryption]);

  const handleChangeKey = (e) => {
    SetSecretKeyValue(e.target.value);
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
            onClick={clickTab}
          >
            Шифрование
          </button>
          <button
            className={`${styles.tab} ${
              current === 'decryption' ? activeClass : ''
            }`}
            value="decryption"
            onClick={clickTab}
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
          <div className={styles.count}>{lengthOfText} / 2000</div>
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
          <AppButton
            action={() => handleEncrypt()}
            isButtonDisabled={!encryption.length}
          >
            Запустить
          </AppButton>
        </div>
        <div className={styles.machine__button}>
          <AppButton action={(e) => secretKeyClick(e)} type="outlined">
            Ввести секретный ключ
          </AppButton>
        </div>
      </div>
      <SecretKeyModal
        isOpen={secretStore.openSecretKeyModal}
        setIsOpen={secretStore.setOpenSecretModal}
      >
        <div className={styles.modal}>
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
          </div>
        </div>
      </SecretKeyModal>
    </section>
  );
});
