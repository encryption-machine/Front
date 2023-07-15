import { makeAutoObservable } from 'mobx';

class createStore {
  openAuthForm = false;
  showAuthForm = false;
  showChangePasswordForm = false;
  showChangePasswordFormEmail = false;
  showChangePasswordFormAnswer = false;

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
    this.setShowChangePasswordFormEmail(bool)
  };
  
  setShowChangePasswordFormEmail = (bool) => {
    this.showChangePasswordFormEmail = bool;
    this.showChangePasswordFormAnswer = !bool;
  };
  
  setShowChangePasswordFormAnswer = (bool) => {
    this.showChangePasswordFormAnswer = bool;
    this.showChangePasswordFormEmail = !bool;
  };
}

export const formStore = new createStore();
