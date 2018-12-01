var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const commandController = require('../controllers').command;
const deviceController = require('../controllers').device;
const funcController = require('../controllers').func;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User Router */
router.get('/user', userController.list);
router.get('/user/:id', userController.getById);
router.post('/user', userController.add);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

/* Command Router */
router.get('/command', commandController.list);
router.get('/command/:id', commandController.getById);
router.post('/command', commandController.add);
router.put('/command/:id', commandController.update);
router.delete('/command/:id', commandController.delete);

/* Device Router */
router.get('/device', deviceController.list);
router.get('/device/:id', deviceController.getById);
router.post('/device', deviceController.add);
router.put('/device/:id', deviceController.update);
router.delete('/device/:id', deviceController.delete);

/* Func Router */
router.get('/function', funcController.list);
router.get('/function/:id', funcController.getById);
router.post('/function', funcController.add);
router.put('/function/:id', funcController.update);
router.delete('/function/:id', funcController.delete);

module.exports = router;
