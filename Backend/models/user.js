module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('DOCTOR', 'PATIENT'),
        allowNull : false,
      }
    }, {
      timestamps: false, 
    });
  
    return User;
  }
  