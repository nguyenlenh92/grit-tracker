import 'dotenv/config'
import applyAssociations from "./associations"
import { sequelize } from "./instance";
const sequelize_connection = sequelize

// require('./models/Administrator.Model'),
require('./models/Attribute.Model'),
// require('./models/Corequisite.Model'),
require('./models/Course.Model'),
// require('./models/Equivalence.Model'),
// require('./models/Prerequisite.Model'),
require('./models/Profile.Model'),
require('./models/Requirement.Model'),
require('./models/SatisfiesRequirement.Model'),
// require('./models/Transfer.Model'),
require('./models/User.Model')

applyAssociations(sequelize_connection)

export default sequelize_connection
