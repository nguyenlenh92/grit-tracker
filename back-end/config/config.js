const dotenv =  require("dotenv/config")

module.exports = {
  "development": {
    "username": process.env.CI_DB_USERNAME,
    "password": process.env.CI_DB_PASSWORD,
    "database": process.env.CI_DB_NAME,
    "host": "127.0.0.1",
    "port": 5431,
    "dialect": "postgres"
  }
}
