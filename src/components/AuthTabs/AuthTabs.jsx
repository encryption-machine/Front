import React, { useState } from 'react';
import Tabs from '../Tabs/Tabs';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './AuthTabs.module.scss';

const AuthTabs = () => {
  const tabs = [
    { id: '1', label: 'Войти' },
    { id: '2', label: 'Зарегистрироваться' },
  ];

  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const handleTabClick = (id) => {
    setSelectedTabId(id);
  };

  return (
    <section className="AuthTabs">
      <Tabs selectedId={selectedTabId} tabs={tabs} onClick={handleTabClick} />
      <div className="AuthTabs-Content">
        {selectedTabId === tabs[0].id && <SignInForm />}
        {selectedTabId === tabs[1].id && <SignUpForm />}
      </div>
    </section>
  );
};

export default AuthTabs;
