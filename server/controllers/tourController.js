const robin = require("roundrobin");

const createTournament = async (req, res) => {
  try {
    if (req.session.user) {
      const db = req.app.get("db");
      const { tournament_name, teams_number, tournament_type } = req.body;
      const user_id = req.session.user.id;
      const addedTour = await db.tournaments.create_tournament({
        tournament_name,
        user_id,
        teams_number,
        tournament_type,
      });
      res.status(200).send(addedTour);
    } else {
      res.status(400).send("You need to be logged in");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

////funcion para crear ida y vuelta del torneo
const doubleRound = (arr) => {
  let newArr = arr;
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr[i].length; j++) {
      newArr[i][j] = [newArr[i][j][1], newArr[i][j][0]];
    }
  }
  return newArr;
};
/////

const createTeam = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { teams, tournament_id, tournament_type } = req.body;
    const isEven = teams.length % 2 === 0 ? true : false;
    const teams_number = isEven ? teams.length : teams.length + 1;
    const newTeams = isEven ? teams : [...teams, { teamName: "Rest" }];
    // console.log(newTeams);
    // console.log(teams_number);
    // console.log(tournament_id);
    for (let i = 0; i < newTeams.length; i++) {
      await db.teams.create_team(
        newTeams[i].teamName,
        tournament_id,
        tournament_type
      );
    }
    ////
    const crearTorneo = (teamsArray) => {
      const temporada = [];
      for (let i = 0; i < teamsArray.length - 1; i++) {
        // console.log("uno")
        temporada.push(new Array());
      }

      for (let i = 0; i < temporada.length; i++) {
        for (let j = 0; j < teamsArray.length / 2; j++) {
          temporada[i].push(new Array());
        }
      }

      temporada[0][0][1] = teamsArray[teamsArray.length - 1];

      temporada.forEach((jornada, index, array) => {
        if (index > 0) {
          if (index % 2 !== 0) {
            jornada[0][0] = teamsArray[teamsArray.length - 1];
          } else {
            jornada[0][1] = teamsArray[teamsArray.length - 1];
          }
        }
      });

      let counter = 1;
      temporada.forEach((jornada, index) => {
        // console.log("esta")
        jornada.forEach((partido, index) => {
          if (index > 0) {
            partido[0] = teamsArray[counter - 1];
            if (counter < teamsArray.length - 1) {
              counter++;
            } else {
              counter = 1;
            }
          }
        });
      });

      let counter2 = teamsArray.length - 1;
      temporada.forEach((jornada, index) => {
        if (index % 2 !== 0) {
          /// jornadas impar se cambia index 1
          jornada.forEach((partido, index) => {
            if (index === 0) {
              partido[1] = teamsArray[counter2 - 1];
              if (counter2 > 1) {
                counter2--;
              } else {
                counter2 = teamsArray.length - 1;
              }
            } else {
              partido[1] = teamsArray[counter2 - 1];
              if (counter2 > 1) {
                counter2--;
              } else {
                counter2 = teamsArray.length - 1;
              }
            }
          });
        } else {
          ///jornadas par se cambia index 0
          jornada.forEach((partido, index) => {
            if (index === 0) {
              partido[0] = teamsArray[counter2 - 1];
              if (counter2 > 1) {
                counter2--;
              } else {
                counter2 = teamsArray.length - 1;
              }
            } else {
              partido[1] = teamsArray[counter2 - 1];
              if (counter2 > 1) {
                counter2--;
              } else {
                counter2 = teamsArray.length - 1;
              }
            }
          });
        }
      });
      return temporada;
    };
    ////
    const teamsToSend = await db.teams.get_teams({ tournament_id });
    //aqui genero los matches
    // const matches = robin(teamsToSend.length, teamsToSend);
    // console.log(matches);
    const matches = crearTorneo(teamsToSend);
    /////
    if (matches[0][0][0].tournament_type === "double") {
      const doubleRound = (arr) => {
        const newArr = [];
        for (let i = 0; i < arr.length; i++) {
          newArr.push([]);
          for (let j = 0; j < arr[i].length; j++) {
            newArr[i].push([arr[i][j][1], arr[i][j][0]]);
          }
        }
        return newArr;
      };
      const second = doubleRound(matches);
      for (let i = 0; i < second.length; i++) {
        matches.push(second[i]);
      }
      res.status(200).send(matches);
    } else {
      res.status(200).send(matches);
    }
  } catch (e) {
    res.status(500).send("hubo un error linea 71");
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
      // console.log(tournament);
      const matchesWithWeekPlaying = [];
      const tournament_id = req.body[0][0][0].tournament_id;
      // console.log(tournament_id);
      for (let i = 0; i < tournament.length; i++) {
        for (let j = 0; j < tournament[i].length; j++) {
          tournament[i][j].push(+[i] + 1);
          matchesWithWeekPlaying.push(tournament[i][j]);
          // tournament[i][j] es igual a un partido
        }
      }
      // console.log(matchesWithWeekPlaying);

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
      // console.log(new Date());
      // console.log(filteredMatches);
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
    const { match_date, referee_id, field_id } = req.body;
    // console.log(typeof referee_id);
    console.log(typeof match_id);
    console.log(match_id);
    console.log(typeof referee_id);
    console.log(referee_id);
    console.log(typeof field_id);
    console.log(field_id);

    const updatedMatch = await db.matches.update_matches({
      match_id,
      match_date,
      referee_id,
      field_id,
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
    // console.log(tournament_name);
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

const getTourReferees = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { tournament_id } = req.query;
    const allReferees = await db.tournaments.get_tournament_referees({
      tournament_id,
    });
    res.status(200).send(allReferees);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getMatchReferee = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { referee_id } = req.params;
    const referee = await db.referees.get_referee({
      referee_id,
    });
    res.status(200).send(referee);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getFields = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { tournament_id } = req.query;
    const allFields = await db.tournaments.get_tournament_fields({
      tournament_id,
    });
    res.status(200).send(allFields);
  } catch (e) {
    res.status(500).send(e);
  }
};

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
  getTourReferees,
  getMatchReferee,
  getFields,
};
