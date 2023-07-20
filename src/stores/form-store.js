import { makeAutoObservable } from 'mobx';

class FormStore {
  // управление состоянием формы
  openAuthForm = false;
  showAuthForm = false;
  showRecoveryPasswordForm = false;
  showRecoveryPasswordFormEmail = false;
  showRecoveryPasswordFormAnswer = false;
  showRecoveryPasswordFormNewPassword = false;
  //
  
  // values
  firstPassword = ''
  secondPassword = ''
  email = ''
  question = ''
  answer = ''
  
  // errors
  
  constructor() {
    makeAutoObservable(this);
  }

  // управление состоянием формы
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
  //
  
  
}

export default FormStore;
