import { Sequelize, DataTypes } from 'sequelize'

module.exports = (sequelize: Sequelize) => {
    sequelize.define('equivalence', {
        course_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        course_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    })
}