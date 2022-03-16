const cleanErrorMessage = (element, highlightValid) => {
  const feedback = element.nextSibling;
  element.classList.remove("is-invalid");
  feedback?.classList?.remove("invalid-feedback");
  feedback.innerText = "";

  highlightValid && element.classList.add("is-valid");
};
