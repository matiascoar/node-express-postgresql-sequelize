'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    serial: DataTypes.INTEGER,
    device_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    //owner_id: DataTypes.INTEGER

  }, {});
  Device.associate = function (models) {
    Device.hasMany(models.Command, {
      as: 'commands',
      foreignKey: 'device_id'
    });
    Device.belongsToMany(models.User, {
      through: 'Privilege',
      as: 'devices',
      foreignKey: 'user_id'
    });
    /*Device.belongsTo(models.User, {
      as: 'owned_devices',
      foreignKey: 'owner_id'
    });*/
    Device.hasMany(models.Func, {
      foreignKey: 'device_id',
      as: 'functions',
    });
  };
  return Device;
};