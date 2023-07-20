import { makeAutoObservable } from 'mobx';

class FormValuesStore {
  value = '';
  error = '';
  empty = '';
  valid = '';

  constructor() {
    makeAutoObservable(this);
  }

  setValue = (value) => {
    this.value = value;
  };

  setError = (error) => {
    this.error = error;
  };

  setValid = (valid) => {
    this.valid = valid;
  };

  setEmpty = (empty) => {
    this.empty = empty;
  };
}

export default FormValuesStore;
