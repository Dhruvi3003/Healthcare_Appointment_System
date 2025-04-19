const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

// CORS configuration
app.use(cors({
  origin: 'http://127.0.0.1:5501', // Allow the correct origin
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "theracis",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    process.exit(1); // Exit if the database connection fails
  }
  console.log("✅ Connected to MySQL Database");
});

// API Endpoint to handle appointment booking
app.post("/submit-appointment", (req, res) => {
  const { firstName, email, phone, gender, appointmentDate, department, doctor, comments } = req.body;
  console.log("Received data:", req.body);

  // Validate incoming data (optional but good practice)
  if (!firstName || !email || !phone || !appointmentDate || !department || !doctor || gender === "Your Gender" || department === "Department" || doctor === "Choose Doctor") {
    console.log("Validation failed:", { firstName, email, phone, appointmentDate, department, doctor, gender });
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Validate phone number
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    console.log("Validation failed: Invalid phone number");
    return res.status(400).json({ message: "Phone number must be 10 digits" });
  }

  const query = "INSERT INTO appointments (first_name, email, phone, gender, appointment_date, department, doctor, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [firstName, email, phone, gender, appointmentDate, department, doctor, comments];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to book appointment" });
    }
    console.log("Database result:", result);
    res.status(200).json({ message: "✅ Appointment booked successfully" });
  });
});

// API Endpoint to handle user signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received signup data:", req.body);

  // Validate incoming data (optional but good practice)
  if (!name || !email || !password) {
    console.log("Validation failed:", { name, email, password });
    return res.status(400).json({ message: "All fields are required!" });
  }

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const values = [name, email, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to sign up" });
    }
    console.log("Database result:", result);
    res.status(200).json({ message: "✅ Signup successful" });
  });
});

// API Endpoint to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", req.body);

  // Validate incoming data (optional but good practice)
  if (!email || !password) {
    console.log("Validation failed:", { email, password });
    return res.status(400).json({ message: "All fields are required!" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [email, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    console.log("User logged in:", user);
    res.status(200).json({ message: "✅ Login successful", user });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});