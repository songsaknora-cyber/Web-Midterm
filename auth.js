function setCookie(name, value) {
  var expires = new Date(Date.now() + 86400000).toUTCString();
  document.cookie = name + "=" + value + ";expires=" + expires + ";path=/";
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
}

window.onload = function() {
  var existingRole = getCookie("active_role");
  if (existingRole === "Admin") {
    window.location.href = "admin.html";
    return;
  }
  if (existingRole === "Nurse") {
    window.location.href = "nurse.html";
    return;
  }

  var passwordInput = document.getElementById("password");
  var strengthFill  = document.getElementById("strength-fill");
  var strengthText  = document.getElementById("strength-text");

  passwordInput.addEventListener("input", function() {
    var pw = passwordInput.value;
    var hasLength  = pw.length >= 8;
    var hasNumber  = /\d/.test(pw);
    var hasSpecial = /[^A-Za-z0-9]/.test(pw);
    var score = 0;
    if (hasLength)  score++;
    if (hasNumber)  score++;
    if (hasSpecial) score++;

    if (pw === "") {
      strengthFill.style.width = "0%";
      strengthText.textContent = "";
    } else if (score === 1) {
      strengthFill.style.width = "33%";
      strengthFill.style.background = "red";
      strengthText.textContent = "Weak";
      strengthText.style.color = "red";
    } else if (score === 2) {
      strengthFill.style.width = "66%";
      strengthFill.style.background = "orange";
      strengthText.textContent = "Medium";
      strengthText.style.color = "orange";
    } else {
      strengthFill.style.width = "100%";
      strengthFill.style.background = "green";
      strengthText.textContent = "Strong";
      strengthText.style.color = "green";
    }
  });

  document.getElementById("toggle-btn").addEventListener("click", function() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      this.textContent = "Show";
    }
  });

  var validCredentials = {
    Nurse: { id: "N001", password: "Nurse@123" },
    Admin: { id: "A001", password: "Admin@123" }
  };

  document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    var role     = document.getElementById("role").value;
    var id       = document.getElementById("practitioner-id").value.trim();
    var password = passwordInput.value;
    var errorMsg = document.getElementById("error-msg");

    if (role === "") {
      errorMsg.textContent = "Please select a role.";
      errorMsg.style.display = "block";
      return;
    }

    if (id !== validCredentials[role].id || password !== validCredentials[role].password) {
      errorMsg.textContent = "Wrong ID or password. Try again.";
      errorMsg.style.display = "block";
      return;
    }

    setCookie("active_role", role);
    setCookie("practitioner_id", id);

    if (role === "Admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "nurse.html";
    }
  });
}