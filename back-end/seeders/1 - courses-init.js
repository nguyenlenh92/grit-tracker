'use strict';
const process = require('process')

function get_files(dir){
	var files = [];
	const fs = require('fs');
	
	fs.readdirSync(dir).forEach((file) => {
		files.push(file);
	});

	return files;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		const COURSE_CATALOG_DIR_PATH = process.cwd() + '/course_catalog';


		const courses= [];

		const files = get_files(COURSE_CATALOG_DIR_PATH);

		files.map(file => {
			var page = require(`${COURSE_CATALOG_DIR_PATH}/${file}`);
			courses.push(...page);
		})

		const search_strings = [
			"Social Sciences",
			"Arts and Humanities",
			"Culture",
			"Writing Intensive",
			"Language",
			"Mathematics",
			"Science (non-lab)",
			"Science Plus Lab",
			"Laboratory"
		]
		for (const new_course of courses) {
			var attributes = [];
			for (const search_string of search_strings){
				if (new_course.Attributes){
					if ((new_course.Attributes).indexOf(search_string) != -1){
						attributes.push(search_string);
					}
				}
			}

			await queryInterface.bulkInsert('Courses', [{
				course_id: new_course['Course ID'],
				code: new_course.Course,
				code_number: new_course.Course.split(" ")[1],
				name: new_course.Name,
				credits: parseInt(new_course.Credits),
				description: new_course.Description,
				createdAt: new Date(),
				updatedAt: new Date()
			}], {})
			.then(async () => {
				for (const attribute of attributes){
					await queryInterface.bulkInsert('Attributes', [{
						course: new_course.Course,
						attribute: attribute,
						createdAt: new Date(),
						updatedAt: new Date()
					}]);
				}
			});
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Courses', null, {});
	}
};