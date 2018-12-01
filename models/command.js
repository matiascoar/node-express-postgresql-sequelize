'use strict';
module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define('Command', {
    device_id: DataTypes.INTEGER,
    function_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    unit: DataTypes.STRING
  }, {});
  Command.associate = function(models) {
    /*Command.belongsTo(models.Func);
    Command.belongsTo(models.Device);
    Command.belongsTo(models.User);*/
  };
  return Command;
};