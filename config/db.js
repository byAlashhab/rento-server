const mongo = require("mongodb").MongoClient;

let db;

async function connectToDb(cb) {
  try {
    const client = await mongo.connect(process.env.MONGODB);
    db = client.db("main");
    cb();
  } catch (err) {
    cb(err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
