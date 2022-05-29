import { DataTypes } from 'sequelize'
import { sequelize } from '../instance'

export const UserDAO = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
    },

    lastName: {
        type: DataTypes.STRING,
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