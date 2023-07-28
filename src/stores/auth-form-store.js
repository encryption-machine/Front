import { makeAutoObservable } from 'mobx';

class AuthFormStore {
  openAuthForm = false;
  showAuthForm = false;
  showRecoveryPasswordForm = false;
  showRecoveryPasswordFormEmail = false;
  showRecoveryPasswordFormAnswer = false;
  showRecoveryPasswordFormNewPassword = false;

  value = '';
  emptyMessage = '';
  validMessage = '';
  serverMessage = '';
  loggedIn = false;
  emailUser = '';

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Изменяет состояние авторизации
   * @param {string} value
   */
  setEmailUser = (value) => {
    this.emailUser = value;
  };

  /**
   * Изменяет состояние авторизации
   * @param {boolean} bool
   */
  setLoggedIn = (bool) => {
    this.loggedIn = bool;
    /*     localStorage.removeItem("refresh"); */
  };

  /**
   * Принимает значение инпута
   * @param {string} value
   */
  setValue = (value) => {
    this.value = value;
  };

  /**
   * Принимает объект с одним или несколькими параметрами
   * @param {string} validMessage Текст ошибки невалидного поля
   * @param {string} emptyMessage Текст ошибки пустого поля
   * @param {string} serverMessage Текст ошибки сервера
   */
  setError = ({ validMessage, emptyMessage, serverMessage }) => {
    if (emptyMessage || emptyMessage === '') {
      this.emptyMessage = emptyMessage;
    } else if (validMessage || validMessage === '') {
      this.validMessage = validMessage;
    } else if (serverMessage || serverMessage === '') {
      this.serverMessage = serverMessage;
    }
  };

  /**
   * Управляет состоянием открытия/закрытия модального окна формы авторизации
   * @param {boolean} bool
   */
  setOpenAuthForm = (bool) => {
    this.openAuthForm = bool;
    this.setShowAuthForm(bool);
  };

  /**
   * Управляет состоянием открытия/закрытия формы входа
   * @param {boolean} bool
   */
  setShowAuthForm = (bool) => {
    this.showAuthForm = bool;
    this.showRecoveryPasswordForm = !bool;
  };

  /**
   * Управляет состоянием открытия/закрытия формы восстановления пароля.
   * Показывает начальный экран с формой для ввода email
   * @param {boolean} bool
   */
  setShowRecoveryPasswordForm = (bool) => {
    this.showRecoveryPasswordForm = bool;
    this.showAuthForm = !bool;
    this.setShowRecoveryPasswordFormEmail(bool);
  };

  /**
   * Управляет состоянием открытия/закрытия формы восстановления пароля.
   * Показывает начальный экран с формой для ввода email
   * @param {boolean} bool
   */
  setShowRecoveryPasswordFormEmail = (bool) => {
    this.showRecoveryPasswordFormEmail = bool;
    this.showRecoveryPasswordFormAnswer = !bool;
    this.showRecoveryPasswordFormNewPassword = !bool;
  };

  /**
   * Управляет состоянием открытия/закрытия формы восстановления пароля.
   * Показывает форму для ввода ответа на секретный вопрос
   * @param {boolean} bool
   */
  setShowRecoveryPasswordFormAnswer = (bool) => {
    this.showRecoveryPasswordFormAnswer = bool;
    this.showRecoveryPasswordFormEmail = !bool;
    this.showRecoveryPasswordFormNewPassword = !bool;
  };

  /**
   * Управляет состоянием открытия/закрытия формы восстановления пароля.
   * Показывает форму для ввода новых паролей
   * @param {boolean} bool
   */
  setShowRecoveryPasswordFormNewPassword = (bool) => {
    this.showRecoveryPasswordFormNewPassword = bool;
    this.showRecoveryPasswordFormEmail = !bool;
    this.showRecoveryPasswordFormAnswer = !bool;
  };
}

/**
 * Пример использования локального стора
 *
 * Импорт: import AuthFormStore from '../path/to/store'
 * Создание инстанса: const customName = new AuthFormStore();
 * Деструктуризация: const {value, value} = new AuthFormStore();
 *
 * ПРИМЕЧАНИЕ! Создавать инстанс нужно снаружи компонента.
 * Чтобы использовать стор в качестве зависимости useEffect
 * нужно присвоить константе имя инстанса внутри компонента
 */

export default AuthFormStore;
