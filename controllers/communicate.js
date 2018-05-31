var express = require('express');
var app = express();
var db = require('./persistence.js');
//var apiWeb = require('./api.js')
var get_ip = require('ipware')().get_ip;
var fetcher = require('node-fetch');
var fs = require('fs');
let LinkedListConnect = new Array();

function runningServer() {
    app.set('port', (process.env.PORT || 8000));

    var listener = app.listen(app.get('port'), function() {
        console.log("Server Running on 8000");

    });
    app.set('view engine', 'ejs');
    app.use('/assets', express.static('public'));
    app.use('/partials', express.static('views/partials'));

    app.get('/', function(request, response) {
        response.render('index', { test: 'Hornel Lama' });
    })

    app.get('/dashboard', function(request, response) {
        response.render('dashboard', { test: 'Hornel Lama' });
    })

    app.get('/doctorlist', function(request, response) {

        let ip = request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress;
        let tabIPs = request.ip.toString().split(':');
        console.log('My IP ADRESS:', ip);
        response.render('doctorlist', { test: 'Hornel Lama' });
    })
    app.enable('trust proxy');
    app.get('/geo/:town', function(request, response) {


        /*
        http.get(url, function(response) {
            var finalData = "";

            response.on("data", function(data) {
                finalData += data.toString();
            });

            response.on("end", function() {
                console.log(finalData.length);
                console.log(finalData.toString());
            });

    });
        */
        fs.readFile('public/geolocation/dataLocation.json', 'utf-8', (err, res) => {
            let object = JSON.parse(res)
            let result = {};
            for (var index = 0; index < object.length; index++) {
                var element = object[index];
                if (element.Town.toString().trim() == request.params.town.toString().trim()) {
                    result = element;
                    // console.log(JSON.stringify(result));
                }

            }
            result = JSON.stringify(result);
            response.end(result);
        })

    });

    app.get('/user/:id', function(request, response) {
        db.validationDoctor(request.params.id, function(data) {
            console.log(JSON.stringify(data))
            response.send(data)
        });


    })



    let arrayDoctors = [];

    var io = require('socket.io').listen(listener);
    io.sockets.on('connection', function(socket) {

        console.log("User id:" + socket.id);
        socket.emit('userWeb', arrayDoctors);

        socket.on('validateDoctor', function(code) {
            console.log(code);


            var object = {};
            db.validationDoctor(code, function(data) {
                object = data;
                console.log('response :', JSON.stringify(data));
                socket.emit('validate', object);
            });



        });
        socket.on('finnishedSub', function(object) {
            object = JSON.parse(object);
            console.log('Finalized :', object.id);
            apiWeb.changeStatus(object, function(response) {
                console.log('resonse initialization:', response);
                socket.emit('savesChanged', response);
                if (response.toString().trim() == "200") {
                    arrayDoctors.push(object);
                    object.idSocket = socket.id;
                    socket.broadcast.emit('doctorConnected', object);
                    console.log('Map Okay');
                    console.log('Doctors connected :', arrayDoctors.length);
                }

            });
        });
        socket.on('addLinkedList', function(doctor) {
            console.log(doctor);
        })
        socket.on('disconnect', function() {
            console.log("User disconnect :" + socket.id);
            arrayDoctors.forEach((elt, index) => {

                if (elt.idSocket == socket.id) {
                    console.log('Before Size Doctors Array:' + arrayDoctors.length);
                    socket.broadcast.emit('removeDoctor', arrayDoctors[index]);
                    arrayDoctors.splice(index, 1);
                    console.log('After Size Doctors Array:' + arrayDoctors.length);

                }
            })
        })

    });

}
exports.runningServer = runningServer;