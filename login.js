const loginButton = document.querySelector(".login-button");
const idInput = document.querySelector(".id-input");
const passwordInput = document.querySelector(".password-input");
const passwordEye = document.querySelector(".password-eye");

console.log(passwordInput.type);

loginButton.addEventListener("click", loginButtonClickEvent);

passwordEye.addEventListener("click", passwordEyeClickEvent);

let accounts = {};
const accountUrl = "./accounts.json";
const requestJson = new XMLHttpRequest();
requestJson.open("GET", accountUrl);
requestJson.responseType = "json";
requestJson.send();
requestJson.onload = () => {
  accounts = JSON.parse(JSON.stringify(requestJson.response));
};

function loginButtonClickEvent() {
  accounts.forEach((element) => {
    if (idInput.value === element.ID && passwordInput.value === element.PW) {
      console.log(`Hello ${idInput.value}`);
    }
  });
}

function passwordEyeClickEvent() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordEye.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    passwordInput.type = "password";
    passwordEye.classList.replace("bi-eye-slash", "bi-eye");
  }
}
