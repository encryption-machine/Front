import { makeAutoObservable } from 'mobx';

class FormStore {
  openAuthForm = false;
  showAuthForm = false;
  showRecoveryPasswordForm = false;
  showRecoveryPasswordFormEmail = false;
  showRecoveryPasswordFormAnswer = false;
  showRecoveryPasswordFormNewPassword = false;
  showSecretKeyForm = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOpenAuthForm = (bool) => {
    this.openAuthForm = bool;
    this.setShowAuthForm(bool);
  };

  setShowAuthForm = (bool) => {
    this.showAuthForm = bool;
    this.showRecoveryPasswordForm = !bool;
  };

  setShowRecoveryPasswordForm = (bool) => {
    this.showRecoveryPasswordForm = bool;
    this.showAuthForm = !bool;
    this.setShowRecoveryPasswordFormEmail(bool);
  };

  setShowRecoveryPasswordFormEmail = (bool) => {
    this.showRecoveryPasswordFormEmail = bool;
    this.showRecoveryPasswordFormAnswer = !bool;
    this.showRecoveryPasswordFormNewPassword = !bool;
  };

  setShowRecoveryPasswordFormAnswer = (bool) => {
    this.showRecoveryPasswordFormAnswer = bool;
    this.showRecoveryPasswordFormEmail = !bool;
    this.showRecoveryPasswordFormNewPassword = !bool;
  };
  setShowRecoveryPasswordFormNewPassword = (bool) => {
    this.showRecoveryPasswordFormNewPassword = bool;
    this.showRecoveryPasswordFormEmail = !bool;
    this.showRecoveryPasswordFormAnswer = !bool;
  };
  setShowSecretKeyForm = (bool) => {
    this.showSecretKeyForm = !bool;
  };
}

export default FormStore;
