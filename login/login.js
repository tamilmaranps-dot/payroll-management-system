
function toggleForm() {
  document.getElementById("message").innerText =
    "Signup is disabled for demo. Use admin / admin123.";
}


function validateLogin(username, password) {
  if (!username) return "Username is required";
  if (!password) return "Password is required";
  return null;
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const error = validateLogin(username, password);
  if (error) {
    message.style.color = "red";
    message.innerText = error;
    return;
  }

  
  if (username === "admin" && password === "admin123") {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ username, role: "admin" })
    );

    message.style.color = "green";
    message.innerText = "Login successful";

    setTimeout(() => {
      window.location.href = "../dashboard/dash.html";
    }, 500);
  } else {
    message.style.color = "red";
    message.innerText = "Invalid username or password";
  }
}
