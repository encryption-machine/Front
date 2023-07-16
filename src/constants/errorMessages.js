export const composeEmptyErrorMessage = (value) =>
  `Поле "${value}" не может быть пустым`;

export const passwordMismatchErrorMessage = 'Пароли не совпали';

export const secretQuestionErrorMessage =
  'Секретный вопрос должен содержать любые символы от 1 до 100 знаков';

export const answerErrorMessage =
  'Ответ должен содержать любые символы от 1 до 30 знаков';

export const emailValidErrorMessage = [
  {
    error_title: 'Недопустимые символы или формат.',
    list_title: 'Допустимые символы:',
    item_1: 'цифры',
    item_2: 'латинские буквы',
    item_3: '«_», «-», «@» и «.»',
    format: 'Формат: email@example.com',
  },
];

export const passwordValidErrorMessage = [
  {
    list_title: 'Пароль должен содержать:',
    item_1: 'от 8 до 30 символов',
    item_2: 'цифры',
    item_3: 'заглавные буквы',
    item_4: 'строчные буквы ',
    item_5: 'специальные символы',
  },
];
