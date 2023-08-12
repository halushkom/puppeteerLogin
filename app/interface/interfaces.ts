import express = require("express");

var router = express.Router();
export interface IController {
  router: express.Router;
  validator: any;
}
