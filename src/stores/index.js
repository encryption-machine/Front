import FormStore from './form-store';
import SecretKeyStore from './secret-key';

const FormGlobalStore = new FormStore();
const SecretKeyGlobalStore = new SecretKeyStore();

export { FormGlobalStore, SecretKeyGlobalStore };
