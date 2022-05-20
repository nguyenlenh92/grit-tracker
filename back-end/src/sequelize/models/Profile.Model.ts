import { sequelize } from '../instance'
import { DataTypes } from 'sequelize'

export const ProfileDAO = sequelize.define('Profile', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    semester: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    notes: {
        type: DataTypes.STRING
    },
    grade: {
        type: DataTypes.CHAR(1)
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
})