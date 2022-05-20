'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {

		const list_requirements = {
			GPA: {
				name: "2.00 GPA",
				satisfy_condition: "A minimum cumulative UMBC grade point average of 2.00."
			},
            LN_12: {
				name: "Computer Science: Software Engineering",
				satisfy_condition: ""
			},
            LN_20: {
				name: "Mathematics",
				satisfy_condition: ""
			},
            LN_25: {
				name: "Statistics",
				satisfy_condition: ""
			},
            LN_40: {
				name: "Science Sequence",
				satisfy_condition: "Students must take 12 credits in science courses. Two courses must be from one of the following sequences: BIOL 141 and BIOL 142, CHEM 101 and CHEM 102, or PHYS 121 and PHYS 122."
			},
            LN_50: {
				name: "Science: Four Additional Credits",
				satisfy_condition: "Students must take 12 credits of science total. Please select courses from the following list to complete your 12 credit requirement:"
			},
            LN_55: {
				name: "Science: 12 Credits",
				satisfy_condition: "This requirement is to help verify that you have completed 12 credits of science including the Biology sequence, Chemistry sequence, or Physics sequence."
			},
            LN_60: {
				name: "Computer Science Electives",
				satisfy_condition: "Students must complete two CMSC electives"
			},
            LN_70: {
				name: "Technical Electives",
				satisfy_condition: "Students must complete three courses from the list below. Up to two courses may be from the approved MATH courses listed below."
			},
            RQ_3006: {
				name: "GEP: Mathematics",
				satisfy_condition: "You must complete one course designated as (M) in Mathematics or Statistics."
			},
            RQ_3007: {
				name: "GEP: Science",
				satisfy_condition: "Students must complete two science courses and one laboratory course with a general education designation"
			},
            RQ_3008: {
				name: "GEP: Culture",
				satisfy_condition: "B.A. students must complete two courses with the Culture (C) designation; B.S. students must complete one course with the Culture (C) designation."
			},
            RQ_3009: {
				name: "GEP: Language 201",
				satisfy_condition: "Students must complete a foreign language through the 201 level or demonstrate proficiency at the 201 level by completing Level IV or higher of a language in high school. Corresponding test credit (AP, IB, or CLEP) may also satisfy this requirement."
			},
            RQ_3022: {
				name: "GEP: English Composition",
				satisfy_condition: "You must complete English 100 or an equivalent course."
			},
            RQ_3023: {
				name: "120 Academic Credits",
				satisfy_condition: "Students must complete a minimum of 120 academic credits"
			},
            RQ_3028: {
				name: "GEP: Arts and Humanities",
				satisfy_condition: "You must complete three courses designated Arts and Humanities (AH); courses must come from at least two different academic disciplines."
			},
            RQ_3029: {
				name: "GEP: Social Sciences",
				satisfy_condition: "You must complete three courses designated Social Sciences (SS); courses must come from at least two different academic disciplines."
			},
            RQ_3092: {
				name: "CMSC Gateway",
				satisfy_condition: "Students must complete the following gateway courses: CMSC 201 and CMSC 202 with a grade of B or higher, and CMSC 203 with a grade of C or higher."
			},
            RQ_3832_10: {
				name: "Computer Science",
				satisfy_condition: ""
			},
            RQ_3463: {
				name: "Writing Intensive Requirement",
				satisfy_condition: "One course that is writing intensive (WI) is required."
			},
            UPPER_45: {
				name: "45 Upper-Level credits",
				satisfy_condition: "45 credits of upper-level courses numbered at the 300 to 400 level"
			},
		};

		for (const [key, value] of Object.entries(list_requirements)){
			await queryInterface.bulkInsert('Requirements', [{
				requirement: key,
				name: value.name,
				satisfy_condition: value.satisfy_condition,
				degree: 'CMSC',
				createdAt: new Date(),
				updatedAt: new Date()
			}], {});
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Requirements', null, {});
	}
};