const Func = require('../models').Func;
const Device = require('../models').Device;
const Command = require('../models').Command;

module.exports = {
  list(req, res) {
    return Func.findAll({
      include: [{
        model: Device,
        as: 'device'
      }, {
        model: Command,
        as: 'commands'
      }],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Command, as: 'commands' }, 'createdAt', 'DESC'],
      ],
    })
      .then((funcs) => res.status(200).send(funcs))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Func
      .findById(req.params.id, {
        include: [{
          model: Func,
          as: 'funcs'
        }],
      })
      .then((func) => {
        if (!func) {
          return res.status(404).send({
            message: 'Func Not Found',
          });
        }
        return res.status(200).send(func);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Func
      .create({
        func_name: req.body.func_name,
        unit: req.body.unit,
        device_id: req.body.device_id
      })
      .then((func) => res.status(201).send(func))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Func
      .findById(req.params.id, {
        include: [{
          model: Func,
          as: 'funcs'
        }],
      })
      .then(func => {
        if (!func) {
          return res.status(404).send({
            message: 'Func Not Found',
          });
        }
        return func
          .update({
            func_name: req.body.func_name || func.func_name,
            unit: req.body.unit || func.unit,
            device_id: req.body.device_id || func.device_id
          })
          .then(() => res.status(200).send(func))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Func
      .findById(req.params.id)
      .then(func => {
        if (!func) {
          return res.status(400).send({
            message: 'Func Not Found',
          });
        }
        return func
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
