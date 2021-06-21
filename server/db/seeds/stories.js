
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stories').del()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert([
        {id: 1, story_name: 'Love Letter', story_text: `To my dearest Joseph, It has been 4 days since we last saw each other and I cannot stop thinking about you. Your beautiful eyes will remain forever in my memory, like shining orbs of light they pierce my dreams. The way you spoke so softly and held my hand made me feel so warm inside. I can't remember what we talked about, but only that we talked for hours. I know our love is forbidden, but I don't care what anyone says. I will love you forever. I've left a note in your locker. Meet me in the hallway after class tomorrow. Yours truly, Sarah`, story_id: 101},
        {id: 2, story_name: 'Job Application', story_text: '', word_positions: [], parts_of_speech: []},
        {id: 3, story_name: 'Letter to the Editor', story_text: '', word_positions: [], parts_of_speech: []}
      ]);
    });
};