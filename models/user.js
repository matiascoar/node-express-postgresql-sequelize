'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    mail: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Command, {
      as: 'commands',
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.Device, {
      through: 'Privilege',
      as: 'devices',
      foreignKey: 'device_id'
    });
    /*User.hasMany(models.Device, {
      as: 'owned_devices',
      foreignKey: 'device_id'
    });*/
  };
  return User;
};