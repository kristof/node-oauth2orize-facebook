'use strict';

var request = require('request');
var crypto = require('crypto');

exports.getFacebookProfile = function (accessToken, appsecretProof, fields, cb) {

  var url = 'https://graph.facebook.com/me?&access_token=' + accessToken +
            '&fields=' + fields;

  if(appsecretProof){
    url += '&appsecret_proof=' + appsecretProof;
  }

  request({
    url: url,
    json: true
  },
  function (err, res, body) {
    if (err) {
      return cb(err);
    }

    if (body && body.error) {
      var msg = body.error.message || 'Could not get Facebook profile.';
      return cb(new Error(msg));
    }

    cb(null, body);
  });
};
