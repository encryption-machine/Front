import React, { useState } from 'react';
import Tabs from '../Tabs/Tabs';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import styles from './AuthTabs.module.scss';

const AuthTabs = () => {
  const tabsBar = [
    { id: '1', label: 'Войти' },
    { id: '2', label: 'Зарегистрироваться' },
  ];

  const propStyles = {
    tabs: styles.tabs,
    bar: [styles.tab, { selected: '' }],
    label: [styles.tabLabel, { selected: styles.tabLabel__selected }],
  };

  const [selectedTabId, setSelectedTabId] = useState(tabsBar[0].id);

  const handleTabClick = (id) => {
    setSelectedTabId(id);
  };

  return (
    <section>
      <Tabs
        className={propStyles}
        selectedId={selectedTabId}
        tabs={tabsBar}
        onClick={handleTabClick}
      />
      <div className={styles.authTabs__content}>
      {selectedTabId === tabsBar[0].id && <SignInForm />}
        {selectedTabId === tabsBar[1].id && <SignUpForm />}
       {selectedTabId === tabsBar[0].id && <SignInForm onLogin={onLogin}  loggedIn={loggedIn} textError={textError}/>}

        {selectedTabId === tabsBar[1].id && <SignUpForm />} 
      </div>
    </section>
  );
};

export default AuthTabs;
