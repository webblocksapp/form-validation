const max = (
  value,
  maxValue,
  errorMessage = "El valor máximo aceptado es {{maxValue}}"
) => {
  if (value <= maxValue) {
    return true;
  } else {
    throw errorMessage.replace("{{maxValue}}", maxValue);
  }
};
