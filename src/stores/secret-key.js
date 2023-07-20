import { makeAutoObservable } from 'mobx';

class SecretKeyStore {
  openSecretKeyModal = false;
  secretKeyText = '';

  constructor() {
    makeAutoObservable(this);
  }

  setOpenSecretModal = (bool) => {
    this.openSecretKeyModal = bool;
  };

  setSecretKeyText = (key) => {
    this.secretKeyText = key;
  };
}
export default SecretKeyStore;
