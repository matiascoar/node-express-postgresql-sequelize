'use strict';
module.exports = (sequelize, DataTypes) => {
  const Privilege = sequelize.define('Privilege', {
    user_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
    ttl: DataTypes.INTEGER
  }, {});
  Privilege.associate = function(models) {
    // associations can be defined here
  };
  return Privilege;
};