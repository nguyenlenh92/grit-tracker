'use strict';
const generatePasswordHash = require('../src/utils/PasswordHashing')

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const [hash, salt] = generatePasswordHash("password", "");

        await queryInterface.bulkInsert('Users', [{
            username: "admin",
            password: hash,
            degree: "CMSC",
            salt: salt,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};