import { DataTypes } from 'sequelize'
import { sequelize } from '../instance'

export const CourseDAO = sequelize.define('Course', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    code_number: {
        allowNull: false,
        type: DataTypes.STRING
    },
    course_id: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credits: {
        type: DataTypes.INTEGER
    },
    description: {
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
