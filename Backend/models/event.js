module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      patientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      operation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false, 
    });
    
    return Event;
  }