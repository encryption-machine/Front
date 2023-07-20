/* eslint-disable react/jsx-pascal-case */
import cn from 'classnames';
import { Modal } from '../Modal/Modal';
import styles from './AuthModal.module.scss';

const SecretKeyModal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Modal.overlay
      className={isOpen ? cn(styles.overlay, styles.active) : styles.overlay}
      onClose={setIsOpen}
    >
      <Modal.window className={styles.modal}>
        <Modal.close className={styles.close} onClose={setIsOpen} />
        {children}
      </Modal.window>
    </Modal.overlay>
  );
};

export default SecretKeyModal;
