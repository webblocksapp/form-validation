const number = (value, errorMessage = "Este valor debe ser numérico") => {
  if (new RegExp(/^\d+$/).test(value)) {
    return true;
  } else {
    throw errorMessage;
  }
};
