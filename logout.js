function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}

function logout() {
  deleteCookie("active_role");
  deleteCookie("practitioner_id");
  window.location.href = "index.html";
}

function resetSession() {
  deleteCookie("active_role");
  deleteCookie("practitioner_id");
  window.location.href = "login.html";
}