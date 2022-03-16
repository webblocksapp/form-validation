const person = {
  firstName: "",
  secondName: "",
  age: "",
  phone: "",
  city: "",
};

const fields = document.querySelectorAll("#person-form .form-field");
const submitButton = document.querySelector("#person-form button");

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

fields.forEach((field) => {
  field.addEventListener("input", (event) => setFieldValue(event, person));
  field.addEventListener("blur", (event) => setFieldValue(event, person));
  errors[field.name] = { message: "", isInvalid: true };
});

submitButton.disabled = true;
submitButton.addEventListener("click", () => {
  try {
    validate(fields);
    //Si es válido, esta será la info que se enviara a la base de datos.
    alert(JSON.stringify(person));
  } catch (error) {
    //Si es inválido, se mostrará una alerta con el campo inválido.
    alert(error);
  } finally {
    submitButton.disabled = isFormInvalid(errors);
  }
});
