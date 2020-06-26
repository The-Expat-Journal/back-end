const db = require('../database/knex-setup.js');

module.exports = {
  add,
  update,
  remove,
  findStories,
  findBy,
  findById,
  addStory,
  find
}

function find() {
  return db('users').select('id', 'username').orderBy('id');
};


function findStories (id){
  return db('stories')
    .where({user_id: id});

}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function findById(id) {
  return db('users')
    .where({id})
    .first();
}

function addStory(storyData){
  return db('stories')
    .insert(storyData);
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  }
  catch (error) {
    throw error;
  }
}

function update(changes, id){
  return db('users')
    .where({id})
    .update(changes);

}

function remove(id){
  return db('users')
  .delete()
  .where({id});
}

