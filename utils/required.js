const required = (value, errorMessage = "Este valor es requerido") => {
  if (value.length) {
    return true;
  } else {
    throw errorMessage;
  }
};
