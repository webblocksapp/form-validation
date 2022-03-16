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
      submitButton.disabled = isFormInvalid(errors);
    }
  }
};
