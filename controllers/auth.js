const { getDb } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  SIGNUP: async (req, res) => {
    //front check + validation
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "Missing data" });
    }

    const db = getDb();

    try {
      const user = await db.collection("users").findOne({ email });
      if (user) return res.status(409).json({ message: "User already exists" });
      const hashedPassword = bcrypt.hashSync(password, 10);

      db.collection("users")
        .insertOne({
          email,
          password: hashedPassword,
          firstname,
          lastname,
          role: "user",
        })
        .then(() => {
          return res.status(200).json({message: "Success"});
        })
        .catch((err) => {
          console.error(err);

          return res.status(500).json({ message: "Server Error" });
        });
    } catch (err) {
      console.error(err);

      return res.status(500).json({ message: "Server Error" });
    }
  },
  LOGIN: async (req, res) => {
    const { email, password } = req.body;
    const db = getDb();

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    try {
      const user = await db.collection("users").findOne({ email });
      if (!user) return res.status(400).json({ message: "User was not found" });

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(user, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });

        return res
          .cookie("token", token, {
            httpOnly: true,
            // secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24,
          })
          .status(200)
          .json({ message: "Successfully logged in" });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    } catch {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  ISLOGGEDIN: (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ isloggedin: false });

    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) return res.status(403).json({ isloggedin: false });

      return res.status(200).json({ isloggedin: true });
    });
  },
  LOGOUT: (req, res) => {
    return res
      .clearCookie("token", {
        httpOnly: true,
        // secure: true,
        sameSite: "strict",
      })
      .sendStatus(200);
  },
};
