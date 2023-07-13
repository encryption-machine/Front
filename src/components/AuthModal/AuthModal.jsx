/* eslint-disable react/jsx-pascal-case */
import cn from 'classnames';
import { Modal } from '../Modal/Modal';
import AuthTabs from '../AuthTabs/AuthTabs';
import styles from './AuthModal.module.scss';

const AuthModal = ({ isOpen, setIsOpen, onLogin, textError, loggedIn, isModalClose }) => {
   console.log(isModalClose, 'modalClose-model');
   console.log(isOpen, 'isOpen-model');
   console.log(setIsOpen, 'setIsOpen-model');
   
  return (
    <Modal.overlay
      //TODO представляла, что добавлю сюда (|| !isModalClose) состояние стейта и попап закроется 
      className={isOpen || !isModalClose ? cn(styles.overlay, styles.active) : styles.overlay}
      onClose={setIsOpen}
    >
      <Modal.window className={styles.modal}>
        <Modal.close className={styles.close} onClose={setIsOpen} />
        <AuthTabs loggedIn={loggedIn} onLogin={onLogin} textError={textError}/>
      </Modal.window>
    </Modal.overlay>
  );
};

export default AuthModal;
