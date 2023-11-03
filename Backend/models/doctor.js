module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      doctorID: {
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
    
    return Doctor;
  }
  