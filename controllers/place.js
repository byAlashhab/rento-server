const { getDb } = require("../config/db");
const { ObjectId } = require("mongodb");

function validatePlace(body) {
  const {
    availableForRent,
    bedrooms,
    bathrooms,
    sizeInFoot,
    priceInMonth,
    title,
    description,
    image,
    place,
    category,
  } = body;

  return (
    availableForRent &&
    bedrooms &&
    bathrooms &&
    sizeInFoot &&
    priceInMonth &&
    title &&
    description &&
    image &&
    place &&
    category
  );
}

module.exports = {
  GET: async (req, res) => {
    const db = getDb();

    try {
      const places = await db
        .collection("places")
        .find({})
        .toArray();

      return res.status(200).json(places);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  POST: async (req, res) => {
    const user = req.user;
    const db = getDb();

    if (!validatePlace(req.body)) {
      return res.status(400).json({ message: "Missing Data" });
    }

    try {
      await db
        .collection("places")
        .insertOne({ userId: user._id, ...req.body });

      return res.status(201).json({ message: "Place added successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  PUT: async (req, res) => {
    const { id } = req.params;
    const db = getDb();

    if (!id) {
      return res.status(400).json({ message: "Missing Id" });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    if (!validatePlace(req.body)) {
      return res.status(400).json({ message: "Missing Data" });
    }

    try {
      await db
        .collection("places")
        .updateOne(
          { _id: ObjectId.createFromHexString(id) },
          { $set: req.body }
        );
      return res.status(200).json({ message: "Updated Successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  DELETE: async (req, res) => {
    const { id } = req.params;
    const db = getDb();

    if (!id) {
      return res.status(400).json({ message: "Missing Id" });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    try {
      await db
        .collection("places")
        .deleteOne({ _id: ObjectId.createFromHexString(id) });

      return res.status(200).json({ message: "Place deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
