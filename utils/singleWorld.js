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
