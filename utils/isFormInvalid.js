const isFormInvalid = (errors) => {
  for (let key in errors) {
    if (errors[key].isInvalid) {
      return true;
    }
  }

  return false;
};
