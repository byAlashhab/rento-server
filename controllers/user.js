// admin only in the dashboard
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

module.exports = {
  GET: async (req, res) => {
    const db = getDb();

    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    try {
      const users = await db
        .collection("users")
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();

      const totalUsers = await db.collection("users").countDocuments({});

      return res.status(200).json({
        users,
        total: totalUsers,
        limit,
        skip,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  PUT: async (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing Data" });
    }

    try {
      await db
        .collection("users")
        .updateOne(
          { _id: ObjectId.createFromHexString(id) },
          { $set: { firstName, lastName, email, password } }
        );
      return res.status(200).json({ message: "User Updated Successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  DELETE: async (req, res) => {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    try {
      await db
        .collection("users")
        .deleteOne({ _id: ObjectId.createFromHexString(id) });

      return res.status(200).json({ message: "User Deleted Successfully" });
    } catch {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  FLUUPDATE: async (req, res) => {
    const db = getDb();
    const user = req.user;
    const { firstname, lastname } = req.body;

    if ((!firstname, !lastname)) {
      return res.status(400).json({ message: "Missing Data" });
    }
    console.log(user._id);

    try {
      await db
        .collection("users")
        .updateOne(
          { _id: ObjectId.createFromHexString(user._id) },
          { $set: { firstname, lastname } }
        );

      return res.status(200).json({ message: "User Updated Successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
