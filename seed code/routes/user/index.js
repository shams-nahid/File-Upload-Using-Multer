var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

router.get('/test', userController.testControllerMethod);

module.exports = router;
