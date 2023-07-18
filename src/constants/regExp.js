export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const anyCharRegExp = /./;

export const specialCharRegExp = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;

export const numberRegExp = /\d/;

export const morseInputTextRegExp = /^[а-яА-я\d\s.,:;)(?!=+-/$@&_"']*$/gm;

export const morseInputCodeRegExp = /[-.\s]/gm;

export const cesarRegExp = /^[а-яА-я\d\s.,:;)(*#%!+-/$&"']*$/gm;

export const cesarReplaceCharRegExp = /[Ёё]/gm;
