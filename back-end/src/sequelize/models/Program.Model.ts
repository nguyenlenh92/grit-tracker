import { DataTypes } from 'sequelize'
import { sequelize } from '../instance'

export const ProgramDAO = sequelize.define('Program', {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    type: {
        allowNull: true,
        type: DataTypes.STRING
    },
    track: {
        allowNull: true,
        type: DataTypes.STRING
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