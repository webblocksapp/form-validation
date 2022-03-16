const validate = (fields) => {
  for (let field of fields) {
    validateField({ name: field.name, value: field.value, element: field });
  }

  for (let key in errors) {
    if (errors[key].isInvalid) {
      throw "El formulario contiene errores.";
    }
  }
};
