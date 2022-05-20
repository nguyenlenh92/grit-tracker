'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Profile, {foreignKey: 'username'});
		}
	}
	User.init({
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		degree: DataTypes.STRING,
		salt: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};