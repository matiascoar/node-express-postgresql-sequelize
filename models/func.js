'use strict';
module.exports = (sequelize, DataTypes) => {
  const Func = sequelize.define('Func', {
    device_id: DataTypes.INTEGER,
    func_name: DataTypes.STRING,
    unit: DataTypes.STRING,
  }, {});
  Func.associate = function(models) {
    Func.belongsTo(models.Device, {
      as: 'device',
      foreignKey: 'device_id'
    })
    Func.hasMany(models.Command, {
      foreignKey: 'func_id',
      as: 'commands',
    });
  };
  return Func;
};