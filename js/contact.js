const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#your-name");
const nameError = document.querySelector("#your-nameError");
const email = document.querySelector("#your-email");
const emailError = document.querySelector("#your-emailError");
const subject = document.querySelector("#your-subject");
const subjectError = document.querySelector("#your-subjectError");
const message = document.querySelector("#your-message");
const messageError = document.querySelector("#your-messageError");
const success = document.querySelector(".success");
const button = document.querySelector("button");

function validateForm() {
  event.preventDefault();

  if(checkLength(fullName.value, 5) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  if(validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if(checkLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if(checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if(checkLength(fullName.value, 5) === true && validateEmail(email.value) === true && checkLength(subject.value, 15) === true && checkLength(message.value, 25) === true) {
    success.style.display = "block";
    button.style.display = "none";
    fullName.style.display = "none";
    email.style.display = "none";
    subject.style.display = "none";
    message.style.display = "none";
  } 
  
}

const formSubmissionHandler = (event) => {
  event.preventDefault();

  const formElement = event.target,
    { action, method } = formElement,
    body = new FormData(formElement);

  fetch(action, {
    method,
    body
  })
    ;
};

const formElement = document.querySelector("form");

formElement.addEventListener("submit", formSubmissionHandler);


form.addEventListener("submit", validateForm)

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

