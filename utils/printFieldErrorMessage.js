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
