'use strict';
module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define('Command', {
    device_id: DataTypes.INTEGER,
    func_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    unit: DataTypes.STRING
  }, {});
  Command.associate = function(models) {
    /*Command.belongsTo(models.Func, {
      foreignKey: 'func_id',
      as: 'func'
    });
    Command.belongsTo(models.Device, {
      foreignKey: 'device_id',
      as: 'device'
    });
    Command.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });*/
  };
  return Command;
};