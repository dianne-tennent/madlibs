
exports.up = function(knex) {
    return knex.schema.createTable('love_letter', table => {
        table.increments('id')
        table.integer('array_index')
        table.string('part_of_speech')
        table.integer('story_id')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('love_letter')
};
