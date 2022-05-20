'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Profile, {foreignKey: 'course'});
        }
    }
    Course.init({
        code: DataTypes.STRING,
        course_id: DataTypes.STRING,
        name: DataTypes.STRING,
        credits: DataTypes.INTEGER,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};