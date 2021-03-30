  
const fs = require('fs');
var promise = require('bluebird');
var CONFIG = require('./appConfig');
var pgp = require('pg-promise')(options);
var DATABASE_PGB = pgp(CONFIG.database.postgres);

module.exports = {
       getAllLocations: getAllLocations
};

var options = {
    promiseLib: promise
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function getAllLocations(cb) {
  DATABASE_PGB.any('SELECT ST_X(loc) as longitude, ST_Y(loc) as latitude ,height as h,t_type as t,observation_time as ob ,id as i from trees')
  .then(function (data) {
    console.log(data)

     cb(null, data);})
   .catch(function (err) {
     console.log(err)
      cb(err)});

}