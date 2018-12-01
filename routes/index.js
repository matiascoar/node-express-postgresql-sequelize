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
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

/* Command Router */
router.get('/api/command', commandController.list);
router.get('/api/command/:id', commandController.getById);
router.post('/api/command', commandController.add);
router.put('/api/command/:id', commandController.update);
router.delete('/api/command/:id', commandController.delete);

/* Device Router */
router.get('/api/device', deviceController.list);
router.get('/api/device/:id', deviceController.getById);
router.post('/api/device', deviceController.add);
router.put('/api/device/:id', deviceController.update);
router.delete('/api/device/:id', deviceController.delete);

/* Func Router */
router.get('/api/function', funcController.list);
router.get('/api/function/:id', funcController.getById);
router.post('/api/function', funcController.add);
router.put('/api/function/:id', funcController.update);
router.delete('/api/function/:id', funcController.delete);

module.exports = router;
