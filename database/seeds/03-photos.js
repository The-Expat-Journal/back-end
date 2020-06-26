
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {id: 1, photo_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', photo_title: "Lago di Braies, Italy", photo_description: "On a boat in Lago di Braies", story_id: 2},
        {id: 2, photo_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', photo_title: "Valley of Fire State Park, United States", photo_description: "Valley of Fires Highway", story_id: 3},
        {id: 3, photo_url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', photo_title: "Oia, Greece", photo_description: "Pathway to the Mediterranean", story_id: 1}
      ]);
    });
};
