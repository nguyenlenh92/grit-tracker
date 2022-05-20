import { DataTypes } from 'sequelize'
import { sequelize } from '../instance'

export const DegreeDAO = sequelize.define('Degree', {
    prefix: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
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