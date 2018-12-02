const Command = require('../models').Command;
const User = require('../models').User;
const Device = require('../models').Device;
const Func = require('../models').Func;

module.exports = {
  list(req, res) {
    return Command
      .findAll({
        include: [{
          model: User,
          as: 'user'
        }, {
          model: Device,
          as: 'device'
        }, {
          model: Func,
          as: 'function'
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((commands) => res.status(200).send(commands))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Command
      .findById(req.params.id, {
        include: [{
          model: Command,
          as: 'commands'
        }],
      })
      .then((command) => {
        if (!command) {
          return res.status(404).send({
            message: 'Command Not Found',
          });
        }
        return res.status(200).send(command);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Command
      .create({
        device_id: req.body.device_id,
        func_id: req.body.function_id,
        user_id: req.body.user_id,
        value: req.body.value,
        unit: req.body.unit
      })
      .then((command) => res.status(201).send(command))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Command
      .findById(req.params.id, {
        include: [{
          model: Command,
          as: 'commands'
        }],
      })
      .then(command => {
        if (!command) {
          return res.status(404).send({
            message: 'Command Not Found',
          });
        }
        return command
          .update({
            device_id: req.body.device_id || command.device_id,
            func_id: req.body.func_id || command.func_id,
            user_id: req.body.user_id || command.user_id,
            value: req.body.value || command.value,
            unit: req.body.unit || command.unit
          })
          .then(() => res.status(200).send(command))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Command
      .findById(req.params.id)
      .then(command => {
        if (!command) {
          return res.status(400).send({
            message: 'Command Not Found',
          });
        }
        return command
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
