const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { username, password, email, first_name, last_name } = req.body;
    if (username && password && email) {
      const existingUsers = await db.auth.get_num_users_by_username({
        username,
      });
      const count = +existingUsers[0].count;
      console.log(count);
      if (count === 1) {
        res.status(400).send("The username is already taken");
      } else {
        const hash = await bcrypt.hash(password, 10);
        await db.auth.add_user({
          username,
          hash,
          email,
          first_name,
          last_name,
        });
        console.log("linea 24");
        req.session.username = username;
        res.status(200).send(req.session.username);
      }
    } else {
      res.status(400).send("Username, password and email are required.");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const login = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const selected = db.auth.get_user_by_username({ username });
    const user = selected[0];
    if (user) {
      const areEqual = await bcrypt.compare(password, user.password);
      if (areEqual) {
        req.session.username = username;
        res.status(200).send(req.session.username);
      } else {
        res.status(403).send("Invalid username or password.");
      }
    } else {
      res.status(404).send("Username does not exist.");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const logout = (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
