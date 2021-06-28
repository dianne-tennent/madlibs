
exports.up = function(knex) {
    return knex.schema.createTable('stories', table => {
        table.increments('id')
        table.string('story_name')
        table.text('story_text')
        table.string('story_title')
        table.string('story_image')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('stories')
};
