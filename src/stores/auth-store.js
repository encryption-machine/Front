import { makeAutoObservable } from 'mobx';

class AuthSore {
  loggedIn = false;
  userEmail = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuthUser = (value, bool) => {
    this.loggedIn = bool;
    this.setAuthUser = value;
  };
}

export default AuthSore;
