const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    retry: {
        max: 10, // Number of maximum retries
        match: [/ETIMEDOUT/, /EHOSTUNREACH/, /ECONNREFUSED/, /ECONNRESET/, /ESOCKETTIMEDOUT/, /ECONNREFUSED/],
    },
});

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.doctor = require('./doctor.js')(sequelize,DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db