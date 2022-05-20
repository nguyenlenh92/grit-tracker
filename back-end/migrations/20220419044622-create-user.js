'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			username: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			salt: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			degree: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true
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
		await queryInterface.dropTable('Users');
	}
};