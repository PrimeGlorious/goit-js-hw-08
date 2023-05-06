import throttle from "lodash.throttle";

const formRef = document.querySelector('.feedback-form');
const EmailInputRef = document.querySelector('input[type="email"]');
const textareaRef = document.querySelector('textarea');
const localStorageMessageKey = 'feedback-form-state';

populateTextarea();

formRef.addEventListener('submit', onFormSumbit);

formRef.addEventListener('input', throttle(onFormInput, 500));

function onFormSumbit(e) {
  e.preventDefault();

  const elements = e.currentTarget.elements;
  console.log('onFormSumbit  elements:', elements)
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
};

function onFormInput(e) {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
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
  console.log('populateTextarea  savedMessageObj:', savedMessageObj)
  if (savedMessage) {
    EmailInputRef.value = savedMessageObj.email;
    textareaRef.value = savedMessageObj.message;
  };
};