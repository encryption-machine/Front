import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { copyToClipboard } from '../../helpers';
import { AppButton } from '../AppButton/AppButton';
import { Chevron, Copy } from '../Icons';
import styles from './Machine.module.scss';

export const Machine = ({ list }) => {
  const [current, setCurrent] = React.useState('encryption');
  const [isSelectOpen, setSelectOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(list[0]);
  const [filteredList, setFilteredList] = React.useState(
    list.filter((item) => item !== selected)
  );
  const [result, setResult] = React.useState('Скопируй меня');
  const [isCopyShow, setIsCopyShow] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [encryption, SetEncryption] = useState('');
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
    // здесь будет запрос к серверу
    // в случае успеха код ниже
    setSelected(value);
    setFilteredList(list.filter((item) => item !== value));
    selectClick();
  };

  const handleEncrypt = useCallback(async () => {
    // здесь будет запрос к серверу
    setResult('hsdfjdsfihsls');
  }, [encryption.target?.value, current]);

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
  }, [isSelectOpen]);

  const selectClasses = !isSelectOpen
    ? styles.select
    : `${styles.select__open} ${styles.select}`;

  const copyClasses = !isCopyShow
    ? styles.copy__message
    : `${styles.copy__messageShow} ${styles.copy__message}`;

  const buttonText = current === 'encryption' ? 'Шифровать' : 'Дешифровать';

  return (
    <div className={styles.machine}>
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
              <Chevron />
            </div>
          </div>
          <div className={styles.select__hide} id="hide">
            <ul className={styles.select__list} id="list">
              {filteredList.map((item) => (
                <li
                  key={item}
                  className={styles.select__option}
                  onClick={(event) => choiceType(event, item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <textarea
          name="leftArea"
          id="leftArea"
          className={styles.text}
          placeholder="Введите текст"
          defaultValue={encryption}
          onChange={SetEncryption}
        />
      </div>
      <div className={styles.copy__cont}>
        <div className={copyClasses}>{copyMessage}</div>
        <textarea
          name="rightArea"
          id="rightArea"
          className={styles.text}
          placeholder="Результат"
          value={result}
          readOnly
        />
        <button
          disabled={isCopyShow}
          onClick={copyCode}
          className={styles.copy__button}
        >
          <Copy />
        </button>
      </div>
      <div className={styles.bottom}>
        <div>
          <AppButton
            action={() => handleEncrypt()}
            isButtonDisabled={!encryption.target?.value.length}
          >
            {buttonText}
          </AppButton>
        </div>
        <div>
          <AppButton typeClass="outlined">Ввести секретный ключ</AppButton>
        </div>
      </div>
    </div>
  );
};
