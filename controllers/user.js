const User = require('../models').User;
const Device = require('../models').Device;

module.exports = {
  list(req, res) {
    return User
      .findAll(/*{
        include: [{
          model: Device,
          as: 'devices'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Device, as: 'devices' }, 'createdAt', 'DESC'],
        ],
      }*/)
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'user'
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
          as: 'user'
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
            user_name: req.body.user_name || classroom.user_name,
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
