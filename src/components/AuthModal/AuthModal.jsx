/* eslint-disable react/jsx-pascal-case */
import cn from 'classnames';
import { Modal } from '../Modal/Modal';
import AuthTabs from '../AuthTabs/AuthTabs';
import styles from './AuthModal.module.scss';

const AuthModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal.overlay
      className={isOpen ? cn(styles.overlay, styles.active) : styles.overlay}
      onClose={setIsOpen}
    >
      <Modal.window className={styles.modal}>
        <Modal.close className={styles.close} onClose={setIsOpen} />
        <AuthTabs />
      </Modal.window>
    </Modal.overlay>
  );
};

export default AuthModal;
