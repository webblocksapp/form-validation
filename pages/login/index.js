const fields = document.querySelectorAll("#login-form .form-field");
const submitButton = document.querySelector("#login-form button");

const login = {
  email: "",
  password: "",
};

const validationsSchema = {
  email: [required, email],
  password: [required],
};

const errors = {};

fields.forEach((field) => {
  field.addEventListener("input", (event) => setFieldValue(event, login));
  field.addEventListener("blur", (event) => setFieldValue(event, login));
});

submitButton.disabled = true;
submitButton.addEventListener("click", () => {
  try {
    validate(fields);
    alert(JSON.stringify(login));
  } catch (error) {
    alert(error);
  } finally {
    submitButton.disabled = isFormInvalid(errors);
  }
});
