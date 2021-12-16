const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const { v4: uuid } = require("uuid");
const { API_KEY } = process.env;

const register = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { username, email, password, first_name, last_name } = req.body;
    if (username && password && email) {
      const existingUsers = await db.auth.get_num_users_by_username({
        username,
      });
      const count = +existingUsers[0].count;
      if (count === 1) {
        res.status(400).send("The username is already taken");
      } else {
        sgMail.setApiKey(API_KEY);
        const message = {
          to: email,
          from: {
            name: "MyTournament",
            email: "support1@mytournament.online",
          },
          subject: "Welcome to MyTournament",
          text: "Hey! Thank you for signing up to MyTournament.online.",
          html: "<h1>Thank you for signing up!</h1><p>We hope you enjoy this tool. If you have any questions please send us an email to support@mytournament.online and we will contact you as soon as possible.</p><p>Thank you from MyTournament team.</p>",
        };
        sgMail
          .send(message)
          .then((response) => console.log("Email sent"))
          .catch((error) => console.log(error));
        const hash = await bcrypt.hash(password, 10);
        const newUser = await db.auth.add_user({
          username,
          hash,
          email,
          first_name,
          last_name,
        });
        delete newUser[0].password;
        req.session.user = newUser[0];
        res.status(200).send(req.session.user);
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
    const selected = await db.auth.get_user_by_username({ username });
    const user = selected[0];
    // console.log(` este es el user que estara en req.session.user ${user.id}`);
    if (user) {
      const areEqual = await bcrypt.compare(password, user.password);
      if (areEqual) {
        req.session.user = user;
        delete user.password;
        res.status(200).send(req.session.user);
        // console.log(req.session.user);
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

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const getUser = (req, res) => {
  const user = req.session.user;
  res.status(200).send(user);
};

const resetPassword = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { email } = req.body;
    const user = await db.auth.get_user_by_email({ email });
    if (user.length >= 1) {
      let id = uuid();
      const insertado = await db.auth.insert_id_email({ id, email });
      sgMail.setApiKey(API_KEY);
      // console.log(insertado[0].email);
      // console.log(id);

      const content = {
        to: insertado[0].email,
        from: "support1@mytournament.online",
        subject: "Password Recovery",
        html: `<body>
        <p>Click to set a new password : <a href="http://localhost:3000/new-password/${id}">Reset password</a></p>

        </body>`,
      };
      await sgMail.send(content);
      res.status(200).send("Please check your email for the next step");
    }
    if (user.length <= 0) {
      res.status(404).send("email does not exist in our records");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const getUserIdVerify = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;
    const email = await db.auth.get_user_pass_reset({ id });
    // console.log(email);
    return res.send(email[0]);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updatePassword = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { email, id, newPassword } = req.body;
    const user = await db.auth.get_user_reset_email({ email });
    if (user.length === 0) {
      return res.status(404).send("an error occured");
    }

    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newPassword, salt);

    //update the users table!
    await db.auth.update_user_password({ password: hashedpassword, email });

    //clear the record in "password_reset" table for security

    await db.auth.delete_pass_user({ id });

    return res.send("password successfully changed!");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
  resetPassword,
  getUserIdVerify,
  updatePassword,
};
