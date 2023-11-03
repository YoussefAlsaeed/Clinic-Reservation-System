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

db.doctor = require('./doctor.js')(sequelize,DataTypes);
db.slot = require('./Slot.js')(sequelize,DataTypes);
db.user = require('./User.js')(sequelize,DataTypes);

db.patient = require('./Patient.js')(sequelize,DataTypes);
db.appointment = require('./appointment.js')(sequelize,DataTypes);


//relation with slot
db.doctor.hasMany(sequelize.models.Slot, { foreignKey: 'doctorID' });
//relation with Appointment
db.doctor.belongsTo(sequelize.models.User, { foreignKey: 'username', targetKey: 'username' });

// Define the associations for foreign keys
db.appointment.belongsTo(sequelize.models.Doctor, { foreignKey: 'doctorID', targetKey: 'doctorID' });
db.appointment.belongsTo(sequelize.models.Slot, { foreignKey: 'slotID', targetKey: 'slotID' });

//relation with appointment
db.patient.hasMany(sequelize.models.Appointment, { foreignKey: 'patientID' });

db.patient.hasMany(sequelize.models.Appointment, { foreignKey: 'patientID' });
db.patient.belongsTo(sequelize.models.User, { foreignKey: 'username', targetKey: 'username' });

db.slot.belongsTo(sequelize.models.Doctor, { foreignKey: 'doctorID', targetKey: 'doctorID' });


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db