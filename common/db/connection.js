'use strict';
let path = require('path');
let q = require('q');
let mysql = require('mysql');
let loadYaml = require('../util/loadYaml');

let dbConfig = loadYaml(path.join(__dirname, '../../config/db.yml'));

var pool = mysql.createPool({
	connectionLimit : 10,
	user: dbConfig.user,
	password: dbConfig.password,
	host: dbConfig.host,
	port: dbConfig.port,
	database: dbConfig.database
});

pool.on('connection', function (conn) {
	conn.query('SET SESSION group_concat_max_len = 1000000');
});

let createStatement = function(sql) {
	var deferred = q.defer();

	pool.query(sql, (err, rows) => {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(rows);
		}
	});

	return deferred.promise;
};

module.exports = {
	createStatement: createStatement
};
