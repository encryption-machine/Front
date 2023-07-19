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
    items: ['цифры', 'латинские буквы', '«_», «-», «@» и «.»',],
    format: 'Формат: email@example.com',
  },
];

export const passwordValidErrorMessage = [
  {
    list_title: 'Пароль должен содержать:',
    items: ['от 8 до 30 символов', 'цифры', 'заглавные буквы', 'строчные буквы ', 'специальные символы',],
  },
];
