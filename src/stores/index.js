import FormStore from './form-store';
import FormValuesStore from './forms/values';

const FormGlobalStore = new FormStore();

const FormGlobalValuesStore = new FormValuesStore();

export { FormGlobalStore, FormGlobalValuesStore };
