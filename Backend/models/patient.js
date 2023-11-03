module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
      patientID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false, 
    });
    
    return Patient;
  }