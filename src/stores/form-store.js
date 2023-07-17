import { makeAutoObservable } from 'mobx';

class FormStore {
  openAuthForm = false;
  showAuthForm = false;
  showChangePasswordForm = false;
  showChangePasswordFormEmail = false;
  showChangePasswordFormAnswer = false;
  showChangePasswordFormNewPassword = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOpenAuthForm = (bool) => {
    this.openAuthForm = bool;
    this.setShowAuthForm(bool);
  };

  setShowAuthForm = (bool) => {
    this.showAuthForm = bool;
    this.showChangePasswordForm = !bool;
  };

  setShowChangePasswordForm = (bool) => {
    this.showChangePasswordForm = bool;
    this.showAuthForm = !bool;
    this.setShowChangePasswordFormEmail(bool);
  };

  setShowChangePasswordFormEmail = (bool) => {
    this.showChangePasswordFormEmail = bool;
    this.showChangePasswordFormAnswer = !bool;
    this.showChangePasswordFormNewPassword = !bool;
  };

  setShowChangePasswordFormAnswer = (bool) => {
    this.showChangePasswordFormAnswer = bool;
    this.showChangePasswordFormEmail = !bool;
    this.showChangePasswordFormNewPassword = !bool;
  };
  setShowChangePasswordFormNewPassword = (bool) => {
    this.showChangePasswordFormNewPassword = bool;
    this.showChangePasswordFormEmail = !bool;
    this.showChangePasswordFormAnswer = !bool;
  };
}

export default FormStore;
