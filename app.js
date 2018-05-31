var socketServer = require('./controllers/communicate.js');
/*

logs.readFile('./controllers/users.log','utf-8',function(err,datas){
    var ctr=0;
    var tab=JSON.parse(datas);
    tab.forEach(function(elt){
        console.log("Begin Size :"+tab.length);
        console.log(elt.name);
        delete tab[ctr];
        ctr++;
        console.log("Ended Size :"+tab.length);
    })
    logs.writeFile('./controllers/users.log',tab);
    console.log('File updated!!');
});
*/


socketServer.runningServer();