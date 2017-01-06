import path from 'path';
import q from 'q';
import mysql from 'mysql';
import loadYaml from '../util/loadYaml';

const dbConfig = loadYaml(path.join(__dirname, '../../config/db.yml'));

const pool = mysql.createPool({
	connectionLimit : 10,
	user: dbConfig.user,
	password: dbConfig.password,
	host: dbConfig.host,
	port: dbConfig.port,
	database: dbConfig.database
});

pool.on('connection', conn => {
	conn.query('SET SESSION group_concat_max_len = 1000000');
});

const createStatement = function(sql) {
	const deferred = q.defer();

	pool.query(sql, (err, rows) => {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(rows);
		}
	});

	return deferred.promise;
};

export default {
	createStatement
};
