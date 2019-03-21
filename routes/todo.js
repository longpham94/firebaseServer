var express = require('express');
var router = express.Router();
var todo = require('../models/todo_tbl');

/* GET todo list. */
router.get('/:id', async function(req, res, next) {
  var userdata = 'OK';
  var trip_id = req.params.id;
  await todo.read(trip_id).then(function (v) {
    userdata = v;
  });
  res.send(userdata);
  res.end();
});

/* POST todo list. */
router.post('/', async function(req, res, next) {
  var userdata = {"message": "error"};
  var trip_id = req.body.tripId;
  var name = req.body.name;
  var des = req.body.des;
  await todo.insert(trip_id,name,des).then(function (v) {
    userdata = v;
  });
  res.send(userdata);
  res.end();
});

/* POST change status. */
router.post('/status', async function(req, res, next) {
  var userdata = {"message": "error"};
  var id = req.body.id;
  var status = req.body.status;
  await todo.changestatus(id,status).then(function (v) {
    userdata = v;
  });
  res.send(userdata);
  res.end();
});

/* DELETE todo. */
router.post('/remove', async function(req, res, next) {
  var userdata = {"message": "error"};
  var id = req.body.id;
  await todo.remove(id).then(function (v) {
    userdata = v;
  });
  res.send(userdata);
  res.end();
});

/* PUT todo list. */
router.put('/', async function(req, res, next) {
  var userdata = {"message": "error"};
  var id = req.body.id;
  var name = req.body.name;
  var des = req.body.des;
  var status = req.body.status;
  await todo.update(id,name,des,status).then(function (v) {
    userdata = v;
  });
  res.send(userdata);
  res.end();
});

module.exports = router;
