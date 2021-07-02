require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { register, login, logout } = require("./controllers/authController");
const app = express();

app.use(express.json());

// Massive setup
massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  console.log("database connected");
});

app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 120,
    },
  })
);

// Auth endpoints
app.post("/auth/register", register);

app.post("/auth/login", login);

app.delete("/auth/logout", logout);

// Functionality endpoints
app.get("/api/tournaments");
app.post("/api/tournament");
app.put("/api/tournament");
app.delete("/api/tournament");
app.get("/api/matches");
app.put("/api/matches");
app.delete("/api/matches");

app.listen(SERVER_PORT, () =>
  console.log(`server running on port ${SERVER_PORT}`)
);
