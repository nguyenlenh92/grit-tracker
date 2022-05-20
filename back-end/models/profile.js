'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Profile extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User);
			this.belongsTo(models.Course);
		}
	}
	Profile.init({
		semester: DataTypes.STRING,
		year: DataTypes.INTEGER,
		note: DataTypes.STRING,
		grade: DataTypes.CHAR(1)
	}, {
		sequelize,
		modelName: 'Profile',
	});
	return Profile;
};