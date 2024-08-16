const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

function validateArticle(body) {
  const { title, description, main, image } = body;

  return title && description && main && image;
}

module.exports = {
  GET: async (req, res) => {
    const db = getDb();

    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    try {
      const articles = await db
        .collection("articles")
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();

      const totalArticles = await db.collection("articles").countDocuments({});

      return res.status(200).json({
        articles,
        total: totalArticles,
        limit,
        skip,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  POST: async (req, res) => {
    const db = getDb();
    const user = req.user;

    if (!validateArticle(req.body)) {
      return res.status(400).json({ message: "Missing Data" });
    }

    try {
      await db
        .collection("articles")
        .insertOne({ userId: user._id, ...req.body });

      return res.status(201).json({ message: "Article Created Successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  PUT: async (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const user = req.user;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    if (!validateArticle(req.body)) {
      return res.status(400).json({ message: "Missing Data" });
    }

    try {
      const article = await db
        .collection("articles")
        .findOne({ _id: ObjectId.createFromHexString(id), userId: user._id });

      if (!article) {
        return res.sendStatus(401);
      }

      await db
        .collection("articles")
        .updateOne(
          { _id: ObjectId.createFromHexString(id) },
          { $set: req.body }
        );
      return res.status(200).json({ message: "Article Updated Successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  DELETE: async (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const user = req.user;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    try {
      const article = await db
        .collection("articles")
        .findOne({ _id: ObjectId.createFromHexString(id), userId: user._id });

      if (!article) {
        return res.sendStatus(401);
      }

      await db
        .collection("articles")
        .deleteOne({ _id: ObjectId.createFromHexString(id) });

      return res.status(200).json({ message: "Article Deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
