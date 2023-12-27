document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the form submission
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get input values
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const nim = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (password != "IMMFAST2023") {
        alert("Login failed. Please check your credentials.");        
    }

    else {
    // Send data to the backend
    fetch("https://pemilihan-git-main-gigajdn.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nim }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Token received from the backend
          // Save the token in local storage
          localStorage.setItem("token", data.token);
          localStorage.setItem("nim", data.nim);

          // Redirect to the desired page after login
          window.location.href = "index.html";
        } else {
          // If the token is not received, show an error message
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });        
    }

  });
});
