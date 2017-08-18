'use strict';
var express = require('express');
var api = express.Router();
const contrApi = require("../controllers/api");

api.route("/getMaquinas")
  .get(contrApi.getMaquinas);

api.route("/sendChange")
	.post(contrApi.sendChange);


module.exports = api;