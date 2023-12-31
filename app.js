const express = require("express");
const db = require("better-sqlite3")("database.db", { verbose: console.log });
const path = require("path");
const app = express();
const publicMappe = path.resolve(__dirname, "./public");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(publicMappe));

/* 
const insertStmt = db.prepare(
  `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`
);

const updateStmt = db.prepare(
  `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?;`
);

const removeStmt = db.prepare(`DELETE FROM users WHERE id = ?;`); 

 insertStmt.run("John Doe", "jh@gmail.com", "123456");

*/

app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.send(users);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);

  if (user) {
    res.send("User logged in successfully");
  } else {
    res.send("Wrong email or password");
  }
});

app.post("/addUser", (req, res) => {
  const { name, email, password } = req.body;
  const insertStmt = db.prepare(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`
  );
  insertStmt.run(name, email, password);
  res.send("User added successfully");
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});