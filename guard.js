function getCookie(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
}

window.onload = function() {
  var role = getCookie("active_role");
  var page = document.body.getAttribute("data-page");

  if (!role) {
    window.location.href = "error.html?reason=no_session";
    return;
  }

  if (page === "admin" && role !== "Admin") {
    window.location.href = "error.html?reason=unauthorized";
    return;
  }

  document.getElementById("show-role").textContent = role;
  document.getElementById("show-pid").textContent = getCookie("practitioner_id");
}