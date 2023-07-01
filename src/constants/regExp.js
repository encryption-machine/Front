export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const secretWordRegExp =
  /^[^\s<>()[\]\\.,;:@'\-+=*&?/^!#$№`~|"0-9]*[a-zA-Zа-яА-Я]+[^\s<>()[\]\\.,;:@'\-+=*&?/^!#$№`~|"0-9]*$/;

export const specialCharRegExp = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
