import { makeAutoObservable } from 'mobx';

class FormErrorsStore {

  emailEmpty = ''
  emailValid = ''
  questionEmpty = ''
  questionValid = ''
  answerEmpty = ''
  answerValid = ''
  firstPasswordEmpty = ''
  firstPasswordValid = ''
  secondPasswordEmpty = ''
  secondPasswordValid = ''
  match = ''
  
  constructor() {
    makeAutoObservable(this);
  }
  
}

export default FormErrorsStore;
