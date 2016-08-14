var caminte = require('caminte');
var Schema = caminte.Schema;
var adapters = require('./adapters');
var schema = new Schema(adapters.config.driver, adapters.config);

module.exports.init = function (app) {

      if(!app.models) {
         app.models = {};
      }
      app.models.User = require('../models/User')(schema);
     return app;
}
