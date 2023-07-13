import React, { useState } from 'react';
import Tabs from '../Tabs/Tabs';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import style from './AuthTabs.module.scss';

const AuthTabs = ({ onLogin, textError, loggedIn }) => {
  const tabsBar = [
    { id: '1', label: 'Войти' },
    { id: '2', label: 'Зарегистрироваться' },
  ];

  const propStyles = {
    //tabs: '',
    bar: [style.tab, { selected: '' }],
    label: [style.tabLabel, { selected: style.tabLabel__selected }],
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
      <div className={style.authTabs__content}>
        {selectedTabId === tabsBar[0].id && <SignInForm onLogin={onLogin}  loggedIn={loggedIn} textError={textError}/>}
        {selectedTabId === tabsBar[1].id && <SignUpForm />}
      </div>
    </section>
  );
};

export default AuthTabs;
