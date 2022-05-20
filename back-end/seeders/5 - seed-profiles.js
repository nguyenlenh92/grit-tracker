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
		await queryInterface.bulkInsert('Profiles', [
			{
				username: "admin",
				semester: "Fall",
				year: 2022,
				code: "CMSC 341",
				notes: "Study hard",
				grade: "A",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "admin",
				semester: "Fall",
				year: 2022,
				code: "CMSC 447",
				notes: "Study hard",
				grade: "B",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "admin",
				semester: "Winter",
				year: 2022,
				code: "CMSC 331",
				notes: "",
				grade: "A",
				createdAt: new Date(),
				updatedAt: new Date(),				
			}
	
	], {});
		
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Profiles', null, {});
	}
};
