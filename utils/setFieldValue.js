const setFieldValue = (event, entity) => {
  const { name, value } = event.target;
  entity[name] = value;
  validateField({
    name,
    value,
    element: event.target,
  });
};
