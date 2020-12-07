const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("user").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("user").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("user").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("user").where({ id }).first();
}
