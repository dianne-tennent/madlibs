
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stories').del()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert([
        {id: 1, story_name: 'love_letter', story_title: 'Love Letter', story_text: `To my dearest Sarah, It has been 4 days since we last saw each other and I cannot stop thinking about you. Your shining eyes will remain forever in my memory. The way you spoke so softly and held my hand made me feel so warm inside. I know our love is forbidden, but I don't care what anyone says. I will love you forever. I've left a note in your locker. Meet me in the hallway after class tomorrow. Yours truly, Joseph.`, story_image: '/images/heart.png'},
        {id: 2, story_name: 'letter_to_the_editor', story_title: 'Letter to the Editor', story_text: `Dear Editor, I'm very disappointed about your recent article explaining that young people are going off the rails. This is not true at all. My friends and I are working hard at school and playing sport on the weekends. We are very busy people. We also have to deal with our parents. You can imagine, it's a difficult time. We would appreciate it if you didn't pubicly damage our reputation. Yours sincerely, Tony.`, story_image: '/images/newspaper.png'},
        {id: 3, story_name: 'job_application', story_title: 'Job Application', story_text: `To Whom It May Concern, I'm writing to apply for the front desk position you have advertised. I believe I would be a great candidate because I have excellent communication skills, good attention to detail and I am very reliable. I have experience working at a small office for my mother's accounting firm. Please find my CV attached. Feel free to contact me if you have any questions. Kind regards, Steve.`, story_image: '/images/resume.png'}
      ]);
    });
};