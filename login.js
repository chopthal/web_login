let loggedInId = "";

const loginButton = document.querySelector(".login-button");
const idInput = document.querySelector(".id-input");
const passwordInput = document.querySelector(".password-input");
const passwordEye = document.querySelector(".password-eye");
const loginMessage = document.querySelector(".login-message");
const loginErrorMessage = document.querySelector(".login-error-message");
const logoutButton = document.querySelector(".logout-button");

loginButton.addEventListener("click", loginButtonClickEvent);
logoutButton.addEventListener("click", logoutButtonClickEvent);
passwordEye.addEventListener("click", passwordEyeClickEvent);

// Read account.json file
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
  loginErrorMessage.classList.remove("hidden");
  if (idInput.value === "") {
    loginErrorMessage.innerHTML = "아이디를 입력하세요";
    idInput.focus();
    return;
  }

  if (passwordInput.value === "") {
    loginErrorMessage.innerHTML = "비밀번호를 입력하세요";
    passwordInput.focus();
    return;
  }

  accounts.forEach((element) => {
    if (idInput.value === element.ID && passwordInput.value === element.PW) {
      loggedInId = idInput.value;
      loginMessage.innerHTML = `Hello "${loggedInId}"`;
      loginMessage.classList.remove("hidden");
      logoutButton.classList.remove("hidden");
      loginErrorMessage.classList.add("hidden");
    }
  });

  if (loggedInId === "") {
    loginErrorMessage.innerHTML = "잘못된 계정입니다.";
  }
}

function logoutButtonClickEvent() {
  loginMessage.classList.add("hidden");
  logoutButton.classList.add("hidden");
  loginErrorMessage.classList.remove("hidden");
  loggedInId = "";
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
