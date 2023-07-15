import { injectStores } from '@mobx-devtools/tools';
import { formStore } from './formStore';

injectStores({
  formStore,
});

export { formStore };
