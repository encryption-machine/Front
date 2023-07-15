/* eslint-disable react/jsx-pascal-case */
import { useContext } from 'react'; 
import cn from 'classnames';
import { Modal } from '../Modal/Modal';
import AuthTabs from '../AuthTabs/AuthTabs';
import styles from './AuthModal.module.scss';
import { ModelOpenContext } from '../../context/ModalOpenContext';

const AuthModal = ({ onClickOpen, onLogin, textError, loggedIn }) => {
  const modalOpen = useContext(ModelOpenContext);
   console.log(modalOpen, 'isOpen-model');
 
  return (
    <Modal.overlay
      className={modalOpen ? cn(styles.overlay, styles.active) : styles.overlay}
      onClose={onClickOpen}
    >
      <Modal.window className={styles.modal}>
        <Modal.close className={styles.close}  onClose={onClickOpen}/>
        <AuthTabs loggedIn={loggedIn} onLogin={onLogin} textError={textError}/>
      </Modal.window>
    </Modal.overlay>
  );
};

export default AuthModal;
