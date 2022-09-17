// ID : 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
// PW : 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
// Name : 한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)

const idInput = document.querySelector(".input-id");
const idValidation = document.querySelector(".id-validation");
const idDuplication = document.querySelector(".id-duplication");
const passwordInput = document.querySelector(".input-password");
const passwordValidation = document.querySelector(".password-validation");
const confirmPasswordInput = document;
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

idInput.addEventListener("change", () => {
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

  result && result.length == 0
    ? idDuplication.classList.add("hidden")
    : idDuplication.classList.remove("hidden");
});

passwordInput.addEventListener("change", () => {
  const regExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;
  regExp.test(passwordInput.value)
    ? passwordValidation.classList.add("hidden")
    : passwordValidation.classList.remove("hidden");
});

nameInput.addEventListener("change", () => {
  const regExp = /^[a-zA-Z가-힣 ]{1,50}$/;
  regExp.test(nameInput.value)
    ? nameValidation.classList.add("hidden")
    : nameValidation.classList.remove("hidden");
});

phoneInput.addEventListener("change", () => {
  phoneInput.value && (phoneInput.value = phoneInput.value.replaceAll("-", ""));
  const regExp = /^0\d{2}\d{3,4}\d{4}$/;
  regExp.test(phoneInput.value)
    ? phoneValidation.classList.add("hidden")
    : phoneValidation.classList.remove("hidden");
});

joinButton.addEventListener("click", () => {
  if (!agreeCheckbox.checked) {
    alert("개인정보 수집에 동의해 주십시오.");
    return;
  }
});
