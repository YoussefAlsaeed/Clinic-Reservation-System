module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false, 
    });
  
    return Doctor;
  }
  