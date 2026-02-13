const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("userTableBody");
const successMessage = document.getElementById("successMessage");
const duplicateMessage = document.getElementById("duplicateMessage");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const gender = document.getElementById("gender");

let users = [];

const nameRegex = /^[A-Za-zÑñ\s]+$/;

/* VALIDATION FUNCTION */

function validate() {
  let valid = true;

  // First Name
  if (!nameRegex.test(firstName.value.trim())) {
    firstName.classList.add("is-invalid");
    valid = false;
  } else {
    firstName.classList.remove("is-invalid");
  }

  // Last Name
  if (!nameRegex.test(lastName.value.trim())) {
    lastName.classList.add("is-invalid");
    valid = false;
  } else {
    lastName.classList.remove("is-invalid");
  }

  // Age
  const ageValue = parseInt(age.value);
  if (isNaN(ageValue) || ageValue < 1 || ageValue > 120) {
    age.classList.add("is-invalid");
    valid = false;
  } else {
    age.classList.remove("is-invalid");
  }

  // Gender
  if (!gender.value) {
    gender.classList.add("is-invalid");
    valid = false;
  } else {
    gender.classList.remove("is-invalid");
  }

  return valid;
}

/* SUBMIT */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  successMessage.classList.add("d-none");
  duplicateMessage.classList.add("d-none");

  if (!validate()) return;

  const newUser = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    age: age.value,
    gender: gender.value,
  };

  // Duplicate check
  const exists = users.some(user =>
    user.firstName.toLowerCase() === newUser.firstName.toLowerCase() &&
    user.lastName.toLowerCase() === newUser.lastName.toLowerCase() &&
    user.age === newUser.age &&
    user.gender === newUser.gender
  );

  if (exists) {
    duplicateMessage.classList.remove("d-none");
    return;
  }

  users.push(newUser);

  // Sort alphabetically (Last → First)
  users.sort((a, b) =>
    a.lastName.localeCompare(b.lastName, undefined, { sensitivity: "base" }) ||
    a.firstName.localeCompare(b.firstName, undefined, { sensitivity: "base" })
  );

  renderTable();

  form.reset();

  document.querySelectorAll(".is-invalid")
    .forEach(el => el.classList.remove("is-invalid"));

  successMessage.classList.remove("d-none");
  setTimeout(() => successMessage.classList.add("d-none"), 2000);
});

/* TABLE RENDER */

function renderTable() {
  tableBody.innerHTML = users.map(user => `
    <tr>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.age}</td>
      <td>${user.gender}</td>
    </tr>
  `).join("");
}
