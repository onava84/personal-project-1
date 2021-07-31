// const {
//   default: Dashboard,
// } = require("../../src/components/Dashboard/Dashboard");

const createTournament = async (req, res) => {
  try {
    if (req.session.user) {
      const db = req.app.get("db");
      const { tournament_name, teams_number } = req.body;
      const user_id = req.session.user.id;
      const addedTour = await db.tournaments.create_tournament({
        tournament_name,
        user_id,
        teams_number,
      });
      res.status(200).send(addedTour);
    } else {
      res.status(400).send("You need to be logged in");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const createTeam = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { team_name, tournament_id } = req.body;
    console.log(team_name, tournament_id);
    const team = await db.teams.create_team({ team_name, tournament_id });
    res.status(200).send(team);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getTournaments = async (req, res) => {
  try {
    const db = req.app.get("db");
    // console.log(req.session.user.id);
    const idToGet = req.session.user.id;
    const alltournaments = await db.tournaments.get_tournaments(idToGet);
    res.status(200).send(alltournaments);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSingleTournament = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;
    const tournament = await db.tournaments.get_single_tournament({
      id,
    });
    res.status(200).send(tournament);
  } catch (e) {
    res.status(500).send(e);
  }
};

const createMatches = async (req, res) => {
  try {
    if (req.session.user) {
      const db = req.app.get("db");
      const { team_1, team_2, tournament_id } = req.body;
      const addedMatch = await db.matches.create_matches({
        team_1,
        team_2,
        tournament_id,
      });
      res.status(200).send(addedMatch);
    } else {
      res.status(400).send("You need to be logged in");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const getMatches = async (req, res) => {
  try {
    if (req.session.user) {
      const db = req.app.get("db");
      const { tournament_id } = req.query;
      const filteredMatches = await db.matches.get_matches({ tournament_id });
      // console.log(tournament_id, filteredMatches);
      res.status(200).send(filteredMatches);
    } else {
      res.status(400).send("You need to be logged in");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteTournament = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;
    await db.matches.delete_matches({ id });
    await db.teams.delete_teams({ id });
    await db.tournaments.delete_tournament({ id });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
};

// const deleteMatches = async (req, res) => {
//   try {
//     const db = req.app.get("db");
//     const { tournament_id } = req.params;
//     await db.matches.delete_matches({ tournament_id });
//     res.sendStatus(200);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// };

module.exports = {
  createTournament,
  createTeam,
  getTournaments,
  getSingleTournament,
  createMatches,
  getMatches,
  deleteTournament,
  // deleteMatches,
};
