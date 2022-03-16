const email = (value, errorMessage = "El email es inválido") => {
  if (new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) {
    return true;
  } else {
    throw errorMessage;
  }
};
