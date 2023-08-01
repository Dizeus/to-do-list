const Pool = require('pg').Pool

require('dotenv').config()

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
}

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {    /* <----- Add SSL option */
        rejectUnauthorized: false,
    },//heroku addons
}
console.log(process.env.DATABASE_URL, process.env.NODE_ENV === "production")
const pool = new Pool(process.env.NODE_ENV === "production"? proConfig: devConfig)

module.exports = pool