const { getDb } = require("../config/db");

module.exports = {
  GET: async (req, res) => {
    const db = getDb();
    //by id for each user
    const userId = req.user._id;

    try {
      const likedPlaces = await db
        .collection("liked_places")
        .find({ userId: userId.toString() })
        .toArray();
        
      return res.status(200).json(likedPlaces);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  POST: async (req, res) => {
    const db = getDb();
    const { placeId } = req.params;
    const userId = req.user._id;

    try {
      await db
        .collection("liked_places")
        .insertOne({ userId: userId.toString(), placeId });
      return res.status(201).json({ message: "Place added to favorite" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  DELETE: async (req, res) => {
    const db = getDb();
    const { placeId } = req.params;
    const userId = req.user._id;

    const postExists = await db
      .collection("posts")
      .findOne({ _id: ObjectId(placeId) });

    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    try {
      await db
        .collection("liked_places")
        .deleteOne({ userId: userId.toString(), placeId });

      return res.status(200).json({ message: "Place removed successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
