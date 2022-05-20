import { DataTypes } from 'sequelize'
import { sequelize } from '../instance'

export const RequirementDAO = sequelize.define('Requirement', {
    requirement: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    satisfy_condition: {
        type: DataTypes.TEXT
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
