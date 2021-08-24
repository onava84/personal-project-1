const robin = require("roundrobin");

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

// const createTeam = async (req, res) => {
//   try {
//     const db = req.app.get("db");
//     const { team_name, tournament_id } = req.body;
//     // console.log(team_name, tournament_id);
//     const team = await db.teams.create_team({ team_name, tournament_id });
//     res.status(200).send(team);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// };

const createTeam = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { teams, tournament_id } = req.body;
    // console.log(team_name, tournament_id);
    // console.log("teams:", teams);
    // console.log("tournament_id:", tournament_id);
    // console.log(teams.length);
    const isEven = teams.length % 2 === 0 ? true : false;
    const teams_number = isEven ? teams.length : teams.length + 1;
    const newTeams = isEven ? teams : [...teams, { teamName: "Rest" }];
    console.log(newTeams);
    console.log(teams_number);
    console.log(tournament_id);
    for (let i = 0; i < newTeams.length; i++) {
      await db.teams.create_team(newTeams[i].teamName, tournament_id);
    }
    const teamsToSend = await db.teams.get_teams({ tournament_id });
    //aqui genero los matches
    const matches = robin(teamsToSend.length, teamsToSend);
    console.log(matches);
    res.status(200).send(matches);
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
      const tournament = req.body;
      const matchesWithWeekPlaying = [];
      const tournament_id = req.body[0][0][0].tournament_id;
      console.log(tournament_id);
      for (let i = 0; i < tournament.length; i++) {
        for (let j = 0; j < tournament[i].length; j++) {
          tournament[i][j].push(+[i] + 1);
          matchesWithWeekPlaying.push(tournament[i][j]);
          // tournament[i][j] es igual a un partido
        }
      }
      console.log(matchesWithWeekPlaying);

      for (let i = 0; i < matchesWithWeekPlaying.length; i++) {
        await db.matches.create_matches({
          team_1: matchesWithWeekPlaying[i][0].team_id,
          team_2: matchesWithWeekPlaying[i][1].team_id,
          tournament_id: tournament_id,
          week_playing: matchesWithWeekPlaying[i][2],
        });
      }
      res
        .status(200)
        .send("Se agrego el match correctamente ala base de datos");
    } else {
      res.status(400).send("You need to be logged in");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
///// Aqui envias los matches en forma de un solo array
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
//////
const getMatchesAllUsers = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { tournament_id } = req.query;
    const filteredMatches = await db.matches.get_matches({ tournament_id });
    // console.log(tournament_id, filteredMatches);
    res.status(200).send(filteredMatches);
  } catch (e) {
    res.status(500).send(e);
  }
};
////////
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

const updateMatch = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { match_id } = req.params;
    const { match_date, match_time } = req.body;
    await db.matches.update_matches({
      match_id,
      match_date,
      match_time,
    });
    res.status(200).send("se supone que ya jalo");
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSingleMatch = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { match_id } = req.params;
    const filteredMatch = await db.matches.get_single_match({ match_id });
    res.status(200).send(filteredMatch[0]);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getAllTournaments = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { tournament_name } = req.query;
    console.log(tournament_name);
    if (tournament_name !== undefined) {
      const allTournaments = await db.tournaments.get_single_tournament_by_name(
        { tournament_name }
      );
      res.status(200).send(allTournaments);
    } else {
      const allTournaments = await db.tournaments.get_all_tournaments();
      res.status(200).send(allTournaments);
    }
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
  updateMatch,
  getSingleMatch,
  getAllTournaments,
  getMatchesAllUsers,
};
