const User = require('../models').User;
const Device = require('../models').Device;
const Command = require('../models').Command;

module.exports = {
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: Device,
          as: 'devices'
        }, {
          model: Command,
          as: 'commands'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Device, as: 'devices' }, 'createdAt', 'DESC'],
          [{ model: Command, as: 'commands' }, 'createdAt', 'DESC'],
        ],
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error))
  },

  getById(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return User
      .create({
        user_name: req.body.user_name,
        mail: req.body.mail,
        id_admin: req.body.id_admin,
        password: req.body.password,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            user_name: req.body.user_name || user.user_name,
            mail: req.body.mail || user.mail,
            id_admin: req.body.id_admin || user.is_admin,
            password: req.body.password || user.password,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
