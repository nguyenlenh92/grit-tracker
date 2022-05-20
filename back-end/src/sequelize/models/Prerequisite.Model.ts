import { Sequelize, DataTypes } from 'sequelize'
module.exports = (sequelize: Sequelize) => {
     sequelize.define('prerequisite', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
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