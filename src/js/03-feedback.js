import throttle from "lodash.throttle";

const formRef = document.querySelector('.feedback-form');
const EmailInputRef = document.querySelector('input[type="email"]');
const textareaRef = document.querySelector('textarea');
const localStorageMessageKey = 'feedback-form-state';

populateTextarea();

formRef.addEventListener('submit', onFormSumbit);

formRef.addEventListener('input', onFormInput);

function onFormSumbit(e) {
  e.preventDefault();

  const elements = e.currentTarget.elements;
  const email = elements.email.value;
  const message = elements.message.value;

  if (email === '' || message === '') {
  alert('All fields are required!');
  return;
    };

  const formData = {
  email,
  message,
  };

  console.log(formData);

  e.currentTarget.reset();
  localStorage.removeItem(localStorageMessageKey);
};

function onFormInput(e) {
  const elements = e.currentTarget.elements
  const email = elements.email.value;
  const message = elements.message.value;
  const obj = {
    email,
    message,
  };
  const stringObj = JSON.stringify(obj)
  localStorage.setItem(localStorageMessageKey, stringObj);
};

function populateTextarea() {
  const savedMessage = localStorage.getItem(localStorageMessageKey);
  const savedMessageObj = JSON.parse(savedMessage);
  if (savedMessage) {
    EmailInputRef.value = savedMessageObj.email;
    textareaRef.value = savedMessageObj.message;
  };
};