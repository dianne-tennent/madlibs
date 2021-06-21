
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, array_index: 0, part_of_speech: 'adjective', story_id: 101},
        {id: 2, array_index: 1, part_of_speech: 'noun', story_id: 101},
        {id: 3, array_index: 2, part_of_speech: 'noun', story_id: 101},
        {id: 4, array_index: 3, part_of_speech: 'verb (past tense)', story_id: 101},
        {id: 5, array_index: 4, part_of_speech: 'adjective', story_id: 101}
        {id: 6, array_index: 5, part_of_speech: 'verb', story_id: 101}
        {id: 7, array_index: 6, part_of_speech: 'adverb', story_id: 101}
      ]);
    });
};
