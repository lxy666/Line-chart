/**
 * Created by yu on 2017/5/23.
 */
var mysql = require('mysql');
exports.tmp = function (tem, hum, sun, rfid) {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'trdb'
    });

    connection.connect();
    var date = new Date();
    var time = date.toLocaleString();

    var promise = new Promise(function (resolve, reject) {
        var userAddSql = 'INSERT INTO temp(tem, hum, sun, time,rfid) VALUES(?,?,?,?,?)';
        var userAddSql_Params = [tem, hum, sun, time, rfid];
        connection.query(userAddSql, userAddSql_Params, function (err, result) {
            if (err) {
                resolve('101');
            }
            else {

                resolve('100');
            }
        });

    });

    return promise.then(function (value) {
        return value;

    }, function (value) {

    });
    return promise;
};
exports.select_info = function (start, end) {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'trdb'
    });

    connection.connect();
    var promise = new Promise(function (resolve, reject) {
        var list;
        var userAddSql = "SELECT * FROM temp WHERE temp.key>='" + start + "'AND temp.key<='" + end + "'";
        connection.query(userAddSql, function (err, result) {
            if (err) {
                resolve(err);
            }
            else {
                list = result;
                var obj = {
                    "name": list
                };
                var tmp = JSON.stringify(obj);
                resolve(tmp);
            }
        });
        connection.end();

    });
    return promise.then(function (value) {
        return value;

    }, function (value) {

    });
    return promise;
}

