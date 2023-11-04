module.exports = (sequelize, DataTypes) => {
    const Slot = sequelize.define('Slot', {
      slotID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,  
      },
      time: {
        type: DataTypes.DATE,
        unique: true  
      },

    }, {
      timestamps: false, 
    });
  
    
    return Slot;
  }
  