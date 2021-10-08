require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const {
  register,
  login,
  logout,
  getUser,
  resetPassword,
  getUserIdVerify,
  updatePassword,
} = require("./controllers/authController");
const {
  createTournament,
  createTeam,
  getTournaments,
  createMatches,
  getMatches,
  getSingleTournament,
  deleteTournament,
  updateMatch,
  getSingleMatch,
  getAllTournaments,
  getMatchesAllUsers,
  getTourReferees,
  getMatchReferee,
  getFields,
} = require("./controllers/tourController");
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
app.get("/auth/user", getUser);
app.post("/auth/resetpassword", resetPassword);
app.get("/auth/verifyemail/:id", getUserIdVerify);
app.post("/auth/updatepassword", updatePassword);
// app.po

// Functionality endpoints
// For admin users
app.get("/api/tournaments", getTournaments);
app.get("/api/tournament/:id", getSingleTournament);
app.post("/api/tournament", createTournament);
app.put("/api/tournament");
app.delete("/api/tournament/:id", deleteTournament);
//For any user
// app.get("/api/tournament/:id", getSingleTournamentAlUsers);
app.get("/api/alltournaments", getAllTournaments);
app.get("/api/allmatches", getMatchesAllUsers);
app.get("/api/allmatches/:match_id", getSingleMatch);

app.post("/api/teams", createTeam);
// app.delete("/api/teams/:id", deleteTournament);
// app.post("/api/teams", createTeam)

app.post("/api/matches", createMatches);
app.get("/api/matches", getMatches);
app.put("/api/matches/:match_id", updateMatch);
app.get("/api/matches/:match_id", getSingleMatch);
// app.delete("/api/matches/:tournament_id", deleteMatches);

//referees
app.get("/api/referees", getTourReferees); // get all referees
app.get("/api/match-referee/:referee_id", getMatchReferee); //get specific referee
app.post("/api/referees"); //to add one refe
//fields
app.get("/api/fields", getFields); //get all referees
app.get("/api/fields");

app.listen(SERVER_PORT, () =>
  console.log(`server running on port ${SERVER_PORT}`)
);
