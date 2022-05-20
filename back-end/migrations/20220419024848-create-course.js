'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Courses', {
			code: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			course_id: {
				type: Sequelize.DataTypes.STRING,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			credits: {
				type: Sequelize.DataTypes.INTEGER
			},
			description: {
				type: Sequelize.DataTypes.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Courses');
	}
};