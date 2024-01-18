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
db.slot = require('./slot.js')(sequelize,DataTypes);
db.user = require('./user.js')(sequelize,DataTypes);
db.patient = require('./patient.js')(sequelize,DataTypes);
db.appointment = require('./appointment.js')(sequelize,DataTypes);
db.event = require('./event.js')(sequelize,DataTypes);



// User one-to-one Patient
db.user.hasOne(sequelize.models.Patient, { foreignKey: 'email' });
db.patient.belongsTo(sequelize.models.User, { foreignKey: 'email'});

// User one-to-one Doctor
db.user.hasOne(sequelize.models.Doctor, { foreignKey: 'email' });
db.doctor.belongsTo(sequelize.models.User, { foreignKey: 'email'});

// Doctor one-to-many Slots
db.doctor.hasMany(sequelize.models.Slot, { foreignKey: 'doctorID' });

//Doctor one-to-many Events
db.doctor.hasMany(sequelize.models.Event, { foreignKey: 'doctorID' });
db.event.belongsTo(sequelize.models.Doctor, { foreignKey: 'doctorID'});

// Slots many-to-one Doctor
db.slot.belongsTo(sequelize.models.Doctor, { foreignKey: 'doctorID'});

// Patient one-to-many Appointments
db.patient.hasMany(sequelize.models.Appointment, { foreignKey: 'patientID' });

// Appointments many-to-one Patient
db.appointment.belongsTo(sequelize.models.Patient, { foreignKey: 'patientID'});

// Slot one-to-one Appointment
db.slot.hasOne(sequelize.models.Appointment, { foreignKey: 'slotID' });
db.appointment.belongsTo(sequelize.models.Slot, { foreignKey: 'slotID' });

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db