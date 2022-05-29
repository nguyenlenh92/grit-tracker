'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createdTable('Programs', {
        id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
       },
        name: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING
        },
        type: {
            allowNull: true,
            type: Sequelize.DataTypes.STRING
        },
        track: {
            allowNull: true,
            type: Sequelize.DataTypes.STRING
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Programs');
  }
};
