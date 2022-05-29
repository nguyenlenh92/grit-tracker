import { Sequelize } from "sequelize/types";

function applyAssociations(sequelize: Sequelize) {
/* Destructuring the sequelize.models object. */
    // const { requirement, course, attribute, 
    //     prerequisite, corequisite, equivalence, 
    //     transfer, profile, user, administrator} = sequelize.models
    const { Profile, Course, User, Degree, Requirement, Attribute, SatisfiesRequirement, Program } = sequelize.models 

    Course.hasMany(Profile, { foreignKey: 'code' })
    Profile.belongsTo(Course, { foreignKey: 'code' })

    User.hasMany(Profile, { foreignKey: 'username' })
    Profile.belongsTo(User, { foreignKey: 'username' })

    Program.hasOne(User, {foreignKey: 'degree'})
    User.belongsTo(Program, {foreignKey: 'degree'})

    Degree.hasMany(Requirement, {foreignKey: 'degree'})
    Requirement.belongsTo(Degree, {foreignKey: 'degree'})

    Course.hasMany(Attribute, {foreignKey: 'course'})
    Attribute.belongsTo(Course, {foreignKey: 'course'})

    User.hasMany(SatisfiesRequirement, {foreignKey: 'username'})
    SatisfiesRequirement.belongsTo(User, {foreignKey: 'username'})

    Requirement.hasMany(SatisfiesRequirement, {foreignKey: 'requirement'})
    SatisfiesRequirement.belongsTo(Requirement, {foreignKey: 'requirement'})
}

export default applyAssociations