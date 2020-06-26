exports.up = function(knex) {
return knex.schema
.createTable('users', users => {
  users.increments();
  users
    .string('username', 255)
    .notNullable()
    .unique();
  users.string('password', 255)
    .notNullable();
})

.createTable('stories', stories => {
  stories.increments();
  stories
    .string('story_name', 50)
    .notNullable();
  stories
    .string('story_description')
  stories
    .integer('user_id')
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
})

.createTable('photos', photos => {
  photos.increments();
  photos
    .string('photo_url')
    .notNullable();
  photos
    .string('photo_title')
    .notNullable();
  photos
    .string('photo_description')
  photos
    .integer('story_id')
    .references('id')
    .inTable('stories')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');

})};


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('photos')
    .dropTableIfExists('stories')
    .dropTableIfExists('users');
};
