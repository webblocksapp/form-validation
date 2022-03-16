const person = {
  firstName: "",
  secondName: "",
  age: "",
  phone: "",
  city: "",
};

const fields = document.querySelectorAll("#person-form .form-field");
const submitButton = document.querySelector("#person-form button");

const required = (value, errorMessage = "Este valor es requerido") => {
  if (value.length) {
    return true;
  } else {
    throw errorMessage;
  }
};

const singleWorld = (
  value,
  errorMessage = "Este valor debe contener una sola palabra"
) => {
  const array = value.split(" ");
  if (array.length === 1 || array[1] == "") {
    return true;
  } else {
    throw errorMessage;
  }
};

const number = (value, errorMessage = "Este valor debe ser numérico") => {
  if (new RegExp(/^\d+$/).test(value)) {
    return true;
  } else {
    throw errorMessage;
  }
};

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

const validationsSchema = {
  firstName: [
    (value) => required(value, "El primer nombre es requerido"),
    singleWorld,
  ],
  secondName: [
    (value) => required(value, "El segundo nombre es requerido"),
    singleWorld,
  ],
  age: [required, number, (value) => min(value, 10), (value) => max(value, 99)],
  phone: [required, (value) => phone(value, 601)],
  city: [required],
};

const errors = {};

/**
 * Valida un campo específico del formulario.
 */
const validateField = ({ name, value, element }) => {
  for (let validator of validationsSchema[name]) {
    try {
      validator(value);
      cleanErrorMessage(element, true);
      errors[name] = { message: "", isInvalid: false };
    } catch (error) {
      printFieldErrorMessage(element, error);
      errors[name] = { message: error, isInvalid: true };
      break;
    } finally {
      submitButton.disabled = isFormInvalid();
    }
  }
};

/**
 * Función que valida todos los campos del formulario.
 */
const validate = () => {
  for (let field of fields) {
    validateField({ name: field.name, value: field.value, element: field });
  }

  for (let key in errors) {
    if (errors[key].isInvalid) {
      throw "El formulario contiene errores.";
    }
  }
};

/**
 * Se asigna el valor de un campo del formulario a una entidad específica que es person.
 */
const setFieldValue = (event) => {
  const { name, value } = event.target;
  person[name] = value;
  validateField({ name, value, element: event.target });
};

fields.forEach((field) => {
  field.addEventListener("input", setFieldValue);
  field.addEventListener("blur", setFieldValue);
  errors[field.name] = { message: "", isInvalid: true };
});

const printFieldErrorMessage = (element, errorMessage) => {
  element.classList.remove("is-valid");
  element.classList.add("is-invalid");
  const invalidFeedback = !element.nextSibling.innerHTML
    ? document.createElement("div")
    : element.nextSibling;
  invalidFeedback.classList.add("invalid-feedback");
  invalidFeedback.innerText = errorMessage;

  !element.nextSibling.innerHTML && element.after(invalidFeedback);
};

const cleanErrorMessage = (element, highlightValid) => {
  const feedback = element.nextSibling;
  element.classList.remove("is-invalid");
  feedback?.classList?.remove("invalid-feedback");
  feedback.innerText = "";

  highlightValid && element.classList.add("is-valid");
};

const isFormInvalid = () => {
  for (let key in errors) {
    if (errors[key].isInvalid) {
      return true;
    }
  }

  return false;
};

submitButton.disabled = true;
submitButton.addEventListener("click", () => {
  try {
    validate();
    //Si es válido, esta será la info que se enviara a la base de datos.
    alert(JSON.stringify(person));
  } catch (error) {
    //Si es inválido, se mostrará una alerta con el campo inválido.
    alert(error);
  } finally {
    submitButton.disabled = isFormInvalid();
  }
});
