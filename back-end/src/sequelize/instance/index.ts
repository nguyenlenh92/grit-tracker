import { Sequelize } from 'sequelize'
import 'dotenv/config'

export const sequelize = new Sequelize(String(process.env.DATABASE_URL), {
    logging: false
});

sequelize.authenticate()