const phone = (
  value,
  prefix,
  digitsNumber = 7,
  errorMessages = {
    startsWithPrefixSymbol: "Debe iniciar con el +",
    containsNonDigitCharacters: "Solo se admiten caracteres numéricos",
    invalidNumber:
      "El número debe iniciar con el prefijo {{prefix}} y contener {{digitsNumber}} dígitos",
  }
) => {
  const regexp = `^\\+${prefix}\\d{${digitsNumber}}$`;

  if (new RegExp(/^\+/).test(value) === false) {
    throw errorMessages.startsWithPrefixSymbol;
  } else if (new RegExp(/^\+\D/).test(value)) {
    throw errorMessages.containsNonDigitCharacters;
  } else if (new RegExp(regexp).test(value) === false) {
    throw errorMessages.invalidNumber
      .replace("{{prefix}}", prefix)
      .replace("{{digitsNumber}}", digitsNumber + String(prefix).length);
  } else {
    return true;
  }
};
