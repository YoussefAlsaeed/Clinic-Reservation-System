module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      doctorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      timestamps: false, 
    });
    
    return Doctor;
  }
  