import { makeAutoObservable } from 'mobx';

class createStore {
  openAuthForm = false;
  showAuthForm = false;
  showChangePasswordForm = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOpenAuthForm = (bool) => {
    this.openAuthForm = bool;
    this.setShowAuthForm(bool)
  };

  setShowAuthForm = (bool) => {
    this.showAuthForm = bool;
    this.showChangePasswordForm = !bool;
  };

  setShowChangePasswordForm = (bool) => {
    this.showChangePasswordForm = bool;
    this.showAuthForm = !bool;
  };
}

export const formStore = new createStore();
