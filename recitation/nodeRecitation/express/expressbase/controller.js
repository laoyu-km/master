const fs = require('fs');
const { mainPath } = require('./utils');

const getFn = function (fn) {
  return function (path, encode, callback) {
    return new Promise((resolve, reject) => {
      fn(path, encode, callback(resolve, reject));
    });
  };
};

const readFile = getFn(fs.readFile);

exports.getIndex = function (req, res, next) {
  readFile(
    mainPath + '/public/template/index.html',
    'utf-8',
    (resolve, reject) => {
      return function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      };
    }
  ).then((data) => {
    res.send(data);
    res.end();
  });
};
