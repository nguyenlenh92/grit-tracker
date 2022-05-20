import app from "./app"
import 'dotenv/config'
import { Sequelize } from "sequelize";
import sequelize_connection from "./sequelize"
const PORT = process.env.PORT || 5000
const sequelize = sequelize_connection

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error: any) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init(){

    await assertDatabaseConnectionOk()
    
    // SYNC DATABASE, NO LONGER NEEDED SINCE WE'RE PERFORMING MIGRATION
    await sequelize.sync({alter: true}).catch((error: string) => {console.error(error)})

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

init()

