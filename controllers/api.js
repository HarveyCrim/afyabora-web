let http = require('http');
let urlBase = 'http://design.cide-rdc.org/api/Controllers/'
let urlAuth = urlBase + 'authController.php?code_auth=';
let urlStatus = urlBase + 'authController.php?code_status='
let pathImg = 'http://afya.eu-4.evennode.com/assets/images/';

function auth(code_auth, callback) {
    urlAuth += code_auth;
    http.get(urlAuth, (res) => {
        console.log('Status code:', res.statusCode);
        let result = '';
        if (res.statusCode == 200) {
            let objectvalidate = {};
            res.on('data', (d) => {
                result += d;

            }).on('error', (e) => {
                console.error(e);
            }).on('end', () => {
                let rows = JSON.parse(result)
                if (rows.status == '200') {
                    try {
                        objectvalidate.state = true;
                        objectvalidate.id = rows.data[0]._idCNOM;
                        objectvalidate.name = rows.data[0]._name;
                        objectvalidate.sex = rows.data[0]._sex;
                        objectvalidate.phone = rows.data[0]._phone;
                        objectvalidate.picture = pathImg + rows.data[0]._picture;
                        objectvalidate.status = rows.data[0]._status;
                        objectvalidate.specialty = rows.data[0]._category;
                        objectvalidate.id = rows.data[0]._id;
                    } catch (error) {
                        objectvalidate.state = false;

                    }

                } else {
                    objectvalidate.state = false;
                }


                callback(objectvalidate);
            })
        }
    })

}

function changeStatus(object, callback) {
    urlStatus += object.id;
    console.log('URL:', urlStatus);
    http.get(urlStatus, (res) => {
        if (res.statusCode == 200) {
            let result = '';
            res.on('data', (d) => {
                result += d;
            }).on('end', (d) => {
                result = JSON.parse(result);
                if (result.status == '200') {
                    callback('200');
                } else {
                    callback('404');
                }
            }).on('error', (e) => {

            })

        } else {
            callback('400');
        }
    })
}
exports.authenficate = auth;
exports.changeStatus = changeStatus;