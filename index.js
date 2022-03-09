const person = {
  firstName: "",
  secondName: "",
  age: "",
  phone: "",
  city: "",
};

const fields = document.querySelectorAll("#person-form .form-field");

const required = (value) => {
  return value.length ? true : false;
};

const singleWorld = (value) => {
  const array = value.split(" ");
  return array.length === 1 || array[1] == "" ? true : false;
};

const number = (value) => {
  return new RegExp(/^\d+$/).test(value);
};

const min = (value, minValue) => {
  return value >= minValue ? true : false;
};

const max = (value, maxValue) => {
  return value <= maxValue ? true : false;
};

const phone = (value, prefix, digitsNumber = 7) => {
  const regexp = `^${prefix}\\d{${digitsNumber}}$`;
  return new RegExp(regexp).test(value);
};

const validationsSchema = {
  firstName: [required, singleWorld],
  secondName: [required, singleWorld],
  age: [required, number, (value) => min(value, 10), (value) => max(value, 99)],
  phone: [required, (value) => phone(value, 601)],
  city: [required],
};

fields.forEach((field) => {
  field.addEventListener("input", (event) => {
    const { name, value } = event.target;
    person[name] = value;

    validationsSchema[name].forEach((validator) => {
      console.log(validator(value));
    });
  });
});
