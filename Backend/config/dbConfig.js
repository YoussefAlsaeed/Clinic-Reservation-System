module.exports = {
    HOST: 'mysqldb',
    USER: process.env.MYSQL_USERNAME,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: 'clinic',
    dialect: 'mysql',
    PORT: 3306
}