import FormStore from './form-store';
import AuthSore from './auth-store';

const FormGlobalStore = new FormStore();
const AuthGlobalStore = new AuthSore();

export { FormGlobalStore, AuthGlobalStore };
