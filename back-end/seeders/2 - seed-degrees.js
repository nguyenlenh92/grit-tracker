'use strict';
const mappings = require('../degree_list/programs_prefixes_mapping.json')

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

	const subjects = []
	for (const program of mappings) {
		subjects.push({
			prefix: Object.keys(program)[0],
			name: Object.values(program)[0]
		})
	}

	for (const subject of subjects){
		await queryInterface.bulkInsert('Degrees', [{
			prefix: subject.prefix,
			name: subject.name,
			createdAt: new Date(),
			updatedAt: new Date()
		}])
	}
		
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Degrees', null, {});
	}
};
