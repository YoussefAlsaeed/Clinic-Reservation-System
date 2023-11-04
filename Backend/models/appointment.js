module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      appointmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    }, {
      timestamps: false, 
    });
  
    return Appointment; 
  }
  
  