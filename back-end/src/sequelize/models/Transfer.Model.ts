import { Sequelize, DataTypes } from 'sequelize'

module.exports = (sequelize: Sequelize) => {
    sequelize.define('transfer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
    })
}