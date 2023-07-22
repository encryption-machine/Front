//import { useContext, createContext } from 'react';
import AuthFormStore from './auth-form-store';

const AuthFormGlobalStore = new AuthFormStore();

/**
 * Пример использования глобального стора
 *
 * Импорт: import {GlobalStore} from '../path/to/store'
 * ИЛИ
 * Импорт с кастомным именем: import {GlobalStore as customName} from '../path/to/store'
 *
 * Деструктуризация: const {value, value} = GlobalStore;
 * ИЛИ
 * const {value, value} = customName;
 *
 * ПРИМЕЧАНИЕ! Деструктуризировать нужно внутри компонента
 */

export { AuthFormGlobalStore };
