const Device = require('../models').Device;
const User = require('../models').User;
const Func = require('../models').Func;
const Command = require('../models').Command;

module.exports = {
  list(req, res) {
    return Device
      .findAll({
        include: [{
          model: User,
          as: 'user'
        }, {
          model: Func,
          as: 'functions'
        }, {
          model: Command,
          as: 'commands'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Func, as: 'functions' }, 'createdAt', 'DESC'],
          [{ model: Command, as: 'commands' }, 'createdAt', 'DESC'],
        ],
      })
      .then((devices) => res.status(200).send(devices))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Device
      .findById(req.params.id /*, {
        include: [{
          model: User,
          as: 'user'
        }, {
          model: Func,
          as: 'functions'
        }, {
          model: Command,
          as: 'commands'
        }],
      }*/)
      .then((device) => {
        if (!device) {
          return res.status(404).send({
            message: 'Device Not Found',
          });
        }
        return res.status(200).send(device);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Device
      .create({
        serial: req.body.serial,
        device_name: req.body.device_name,
        user_id: req.body.user_id,
        //owner_id: req.body.owner_id,

      })
      .then((device) => res.status(201).send(device))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Device
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'user'
        }, {
          model: Func,
          as: 'functions'
        }, {
          model: Command,
          as: 'commands'
        }],
      })
      .then(device => {
        if (!device) {
          return res.status(404).send({
            message: 'Device Not Found',
          });
        }
        return device
          .update({
            device_name: req.body.device_name || device.device_name,
            serial: req.body.serial || device.serial,
            user_id: req.body.user_id || device.user_id
          })
          .then(() => res.status(200).send(device))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Device
      .findById(req.params.id)
      .then(device => {
        if (!device) {
          return res.status(400).send({
            message: 'Device Not Found',
          });
        }
        return device
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
