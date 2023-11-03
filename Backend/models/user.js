module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      type: {
        type: DataTypes.STRING,
        allowNull : false,
      }
    }, {
      timestamps: false, 
    });
  
    return User;
  }
  