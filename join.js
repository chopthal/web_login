const idInput = document.querySelector(".input-id");
const idValidation = document.querySelector(".id-validation");
const idDuplication = document.querySelector(".id-duplication");
const passwordInput = document.querySelector(".input-password");
const passwordValidation = document.querySelector(".password-validation");
const checkPasswordInput = document.querySelector(".input-check-password");
const nameInput = document.querySelector(".input-name");
const nameValidation = document.querySelector(".name-validation");
const joinButton = document.querySelector(".join-button");
const agreeCheckbox = document.querySelector(".agree-checkbox");
const phoneInput = document.querySelector(".input-phone");
const phoneValidation = document.querySelector(".phone-validation");

let accounts = {};
const accountUrl = "./accounts.json";
const requestJson = new XMLHttpRequest();
requestJson.open("GET", accountUrl);
requestJson.responseType = "json";
requestJson.send();
requestJson.onload = () => {
  accounts = JSON.parse(JSON.stringify(requestJson.response));
};

let isValidId = false;
let isValidPassword = false;
let isValidCheckPassword = false;
let isValidName = false;
let isValidPhone = false;

idInput.addEventListener("change", () => {
  isValidId = false;
  const regExp = /^[a-z][a-z0-9_-]{4,19}$/;
  if (!regExp.test(idInput.value)) {
    idValidation.classList.remove("hidden");
    return;
  }
  idValidation.classList.add("hidden");
  let result = [];
  result = accounts.filter((account) => {
    return account.ID === idInput.value;
  });
  if (!(result && result.length == 0)) {
    idDuplication.classList.remove("hidden");
    return;
  }
  idDuplication.classList.add("hidden");
  isValidId = true;
});

passwordInput.addEventListener("change", () => {
  isValidPassword = false;
  const regExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;
  if (!regExp.test(passwordInput.value)) {
    passwordValidation.classList.remove("hidden");
    return;
  }
  passwordValidation.classList.add("hidden");
  isValidPassword = true;
});

checkPasswordInput.addEventListener("change", () => {
  isValidCheckPassword = false;
  console.log(passwordInput.value);
  console.log(checkPasswordInput.value);
  if (passwordInput.value !== checkPasswordInput.value) {
    return;
  }
  isValidCheckPassword = true;
});

nameInput.addEventListener("change", () => {
  isValidName = false;
  const regExp = /^[a-zA-Z가-힣 ]{1,50}$/;
  if (!regExp.test(nameInput.value)) {
    nameValidation.classList.remove("hidden");
    return;
  }
  nameValidation.classList.add("hidden");
  isValidName = true;
});

phoneInput.addEventListener("change", () => {
  isValidPhone = false;
  phoneInput.value && (phoneInput.value = phoneInput.value.replaceAll("-", ""));
  const regExp = /^0\d{2}\d{3,4}\d{4}$/;
  if (!regExp.test(phoneInput.value)) {
    phoneValidation.classList.remove("hidden");
    return;
  }
  phoneValidation.classList.add("hidden");
  isValidPhone = true;
});

joinButton.addEventListener("click", () => {
  const id = idInput.value;
  const password = passwordInput.value;
  const CheckPassword = checkPasswordInput.value;
  const name = nameInput.value;
  const phone = phoneInput.value;

  if (!agreeCheckbox.checked) {
    alert("개인정보 수집에 동의해 주십시오.");
    return;
  }
  if (!isValidId) {
    idInput.focus();
    return;
  }
  if (!isValidPassword) {
    passwordInput.focus();
    return;
  }
  if (!isValidCheckPassword) {
    checkPasswordInput.focus();
    return;
  }
  if (!isValidName) {
    nameInput.focus();
    return;
  }
  if (!isValidPhone) {
    phoneInput.focus();
    return;
  }
});
