const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Login Page</title>
    <style>
      .hidden {
        display: none;
      }
    </style>
    <script>
      function toggleRegistrationForm() {
        var loginForm = document.getElementById('login-form');
        var registrationForm = document.getElementById('registration-form');
        var successMessage = document.getElementById('success-message');
  
        loginForm.classList.toggle('hidden');
        registrationForm.classList.toggle('hidden');
        successMessage.classList.add('hidden');
      }
    </script>
  </head>
  <body>
    <h1>Login</h1>
    <form id="login-form" action="/login" method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br>
  
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>
  
      <input type="submit" value="Login">
    </form>
  
    <button onclick="toggleRegistrationForm()">Register</button>
  
    <div id="registration-form" class="hidden">
      <h1>Register</h1>
      <form action="/register" method="post">
        <label for="regUsername">Username:</label>
        <input type="text" id="regUsername" name="regUsername" required><br>
  
        <label for="regPassword">Password:</label>
        <input type="password" id="regPassword" name="regPassword" required><br>
  
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required><br>
  
        <input type="submit" value="Register">
      </form>
    </div>
  
    <div id="success-message" class="hidden">
      Registered successfully! You can now log in using your new credentials.
    </div>
  
    <script>
      var urlParams = new URLSearchParams(window.location.search);
      var registered = urlParams.get('registered');
      if (registered === 'true') {
        toggleRegistrationForm();
        var successMessage = document.getElementById('success-message');
        successMessage.classList.remove('hidden');
      }
    </script>
  </body>
  </html>
  
  `);
});

const validCredentials = [
  { username: 'admin', password: 'password' },
  { username: 'user1', password: '123456' },
  { username: 'user2', password: 'qwerty' },
  // Add more credentials as needed
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const isValidCredentials = validCredentials.some(
    (credentials) =>
      credentials.username === username && credentials.password === password
  );

  if (isValidCredentials) {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

app.post('/register', (req, res) => {
  const { regUsername, regPassword, confirmPassword } = req.body;

  if (regPassword !== confirmPassword) {
    res.status(400).send('Passwords do not match');
  } else {
    const isUsernameTaken = validCredentials.some(
      (credentials) => credentials.username === regUsername
    );

    if (isUsernameTaken) {
      res.status(400).send('Username is already taken');
    } else {
      validCredentials.push({ username: regUsername, password: regPassword });
      res.redirect('/login?registered=true');
    }
  }
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const isValidCredentials = validCredentials.some(
    (credentials) =>
      credentials.username === username && credentials.password === password
  );

  if (isValidCredentials) {
    res.redirect('/home');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

app.get('/home', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Home Page</title>
      <style>
        .container {
          display: flex;
          justify-content: space-around;
          margin-top: 50px;
        }
  
        .box {
          width: 200px;
          height: 200px;
          background-color: #ccc;
          border: 1px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="box">Dog</div>
        <div class="box">Cat</div>
        <div class="box">Other</div>
      </div>
    </body>
    </html>
  `);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


