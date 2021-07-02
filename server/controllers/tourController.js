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
    // const db = req.app.get("db");
    // const {tourName,teamsNumber} = req.body
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  createTournament,
};
