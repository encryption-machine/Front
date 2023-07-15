import { injectStores } from '@mobx-devtools/tools';
import { formStore } from './formStore';

injectStores({
  formStore,
});

const store = Object.assign(formStore);
export default store;
