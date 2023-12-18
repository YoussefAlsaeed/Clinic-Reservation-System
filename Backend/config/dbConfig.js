module.exports = {
    HOST: process.env.DATABASE_URL,
    USER: process.env.MYSQL_USERNAME,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: 'clinic',
    dialect: 'mysql',
    PORT: process.env.DATABASE_PORT
}