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
		const requirements = [
		'GPA',
		'LN_12',
		'LN_20',
		'LN_25',
		'LN_40',
		'LN_50',
		'LN_55',
		'LN_60',
		'LN_70',
		'RQ_3006',
		'RQ_3007',
		'RQ_3008',
		'RQ_3009',
		'RQ_3022',
		'RQ_3023',
		'RQ_3028',
		'RQ_3029',
		'RQ_3092',
		'RQ_3832_10',
		'RQ_3463',
		'UPPER_45'
		];
		for (const requirement of requirements){
			await queryInterface.bulkInsert('SatisfiesRequirements', [{
				requirement: requirement,
				username: 'admin',
				satisfies: false,
				createdAt: new Date(),
				updatedAt: new Date()
			}], {});
		};
  },

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('SatisfiesRequirements');
	}
};
