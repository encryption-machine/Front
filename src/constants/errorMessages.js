export const composeEmptyErrorMessage = (value) =>
  `Поле "${value}" не может быть пустым`;

export const passwordMismatchErrorMessage = 'Пароли не совпали';

export const secretQuestionErrorMessage =
  'Секретный вопрос должен содержать от 3 до 42 латинских или кирилических букв, состоять из одного слова, без пробелов, цифр и знаков';

export const answerErrorMessage =
  'Ответ должен содержать от 3 до 42 латинских или кирилических букв, состоять из одного слова, без пробелов, цифр и знаков';

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
    item_1: 'от 6 до 8 символов',
    item_2: 'цифры',
    item_3: 'заглавные буквы',
    item_4: 'строчные буквы ',
    item_5: 'специальные символы',
  },
];
