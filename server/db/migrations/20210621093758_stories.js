
exports.up = function(knex) {
    return knex.schema.createTable('stories', table => {
        table.increments('id')
        table.string('story_name')
        table.string('story_text')
        table.string('story_title')
        table.integer('story_id')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('stories')
};
