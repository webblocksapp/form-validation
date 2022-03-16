const min = (
  value,
  minValue,
  errorMessage = "El valor mínimo aceptado es {{minValue}}"
) => {
  if (value >= minValue) {
    return true;
  } else {
    throw errorMessage.replace("{{minValue}}", minValue);
  }
};
