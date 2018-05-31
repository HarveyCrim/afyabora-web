var db = require('mysql');
let pathImg = 'http://localhost:8000/assets/images/'
var connection = db.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'db_afya'
});
let STATUS_SERVER = false;
let cnx=connection.connect(function(err,cnx) {
    if (err) {
        console.error("Error connection :", err);
    } else
        console.log('Database Server is running...');
});

function validationDoctor(code, callback) {
    var objectvalidate = {};
    var query = "SELECT * FROM t_doctors WHERE _idCNOM=?";
    connection.query(query, [code], function(err, rows, fields) {
        if (err) {
            console.error("Error :", err);
            objectvalidate.state = false;
            callback(objectvalidate);
        }
        if (rows.length > 0) {
            objectvalidate.state = true;
            objectvalidate.id = rows[0]._idCNOM;
            objectvalidate.name = rows[0]._name;
            objectvalidate.sex = rows[0]._sex;
            objectvalidate.phone = rows[0]._phone;
            objectvalidate.picture = pathImg + rows[0]._picture;
            objectvalidate.status = rows[0]._status;
            objectvalidate.specialty = rows[0]._category;
            objectvalidate.id = rows[0]._id;
            callback(objectvalidate);
        }
        if (rows.length == 0) {
            objectvalidate.state = 'not found';
            callback(objectvalidate);
        }
    });
}

function setStatusDoctor(object, callback) {

    var query = "UPDATE t_doctors SET _status=? WHERE _idCNOM=?";
    connection.query(query, [1, object.id], function(err) {
        if (err == null) {
            console.log('Update CNOM :', object.id);
            callback('200');
        } else {
            console.error(err);
            callback('400');
        }
    });




}
exports.validationDoctor = validationDoctor;
exports.setStatusDoctor = setStatusDoctor;