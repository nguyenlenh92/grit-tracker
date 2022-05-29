'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    var programs = [];
    const folder = './programs/';
    const fs = require('fs');

    fs.readdirSync(folder).forEach(file => {
      programs.push(file);
    });

    for (const program of programs){
      const words = program.split(', B');
      var name = words[0].split('.json')[0];
      var type = '';
      var track = '';
      if (words.length > 1){
        if (words[1] !== ".json"){
          type = 'B' + words[1].split('.json')[0];
          track = type.split('., ')[1];
          type = type.split('., ')[0];
        }
      }
        

      await queryInterface.bulkInsert('Programs', [{
        name: name,
        type: type,
        track: track,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Programs', null, {});

  }
};
