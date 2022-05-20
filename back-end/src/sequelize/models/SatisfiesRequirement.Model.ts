import { DataTypes } from 'sequelize'
import { sequelize } from '../instance'

export const SatisfiesRequirementDAO = sequelize.define('SatisfiesRequirement', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    satisfies: {
        type: DataTypes.BOOLEAN
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
