'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Profiles', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.DataTypes.INTEGER
		},
		semester: {
			type: Sequelize.DataTypes.STRING
		},
		year: {
			type: Sequelize.DataTypes.INTEGER
		},
		notes: {
			type: Sequelize.DataTypes.STRING
		},
		grade: {
			type: Sequelize.DataTypes.CHAR(1)
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
		await queryInterface.dropTable('Profiles');
	}
};