
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'jshehane1', password: "abc123password"},
        {id: 2, username: 'kmilliner1', password: "pa$$word456"},
        {id: 3, username: 'janedoe3', password: "987yaypassword"}
      ]);
    });
};
