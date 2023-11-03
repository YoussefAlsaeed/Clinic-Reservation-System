module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      appointmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patientID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      slotID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    }, {
      timestamps: false, 
    });
  
    

  
    return Appointment; 
  }
  