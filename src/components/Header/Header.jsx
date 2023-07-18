import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import AuthModal from '../AuthModal/AuthModal';
import AuthTabs from '../AuthTabs/AuthTabs';
import RecoveryPasswordForm from '../RecoveryPasswordForm/RecoveryPasswordForm';
import { FormGlobalStore as formStore } from '../../stores/';
import styles from './Header.module.scss';
import logotype from '../../assets/icons/logotype.svg';
import { CustomLink } from '../CustomLink/CustomLink';
import { useState } from 'react';

export const Header = observer(() => {

  const [loggedIn, setLogedIn] = useState(true);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };



  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <img className={styles.logotype} src={logotype} alt="logo" />
        <nav>
          <ul className={styles.list}>
            <li className={styles.chapter}>
              <CustomLink
                href={'#ciphers'}
                target="_self"
                onClick={() => scrollToSection('ciphers')}
              >
                Шифрование
              </CustomLink>
            </li>
            <li className={styles.chapter}>
              <CustomLink
                href={'#aboutCiphers'}
                target="_self"
                onClick={() => scrollToSection('aboutCiphers')}
              >
                О&nbsp;шифрах
              </CustomLink>
            </li>
            <li className={styles.chapter}>
              <CustomLink
                href={'#aboutProject'}
                target="_self"
                onClick={() => scrollToSection('aboutProject')}
              >
                О&nbsp;проекте
              </CustomLink>
            </li>
            {loggedIn &&
              <li>
                <Link
                  to='/profile'
                >
                  Личный&nbsp;кабинет
                </Link>
              </li>

            }
          </ul>
        </nav>
        <div className={styles.entrance}>
          <button
            className={styles.button_header}
            type="button"
            onClick={() => formStore.setOpenAuthForm(true)}
          >
            Войти
          </button>
          <AuthModal
            isOpen={formStore.openAuthForm}
            setIsOpen={formStore.setOpenAuthForm}
          >
            {formStore.showAuthForm && <AuthTabs />}
            {formStore.showRecoveryPasswordForm && <RecoveryPasswordForm />}
          </AuthModal>
        </div>
      </div>
    </header>
  );
});
