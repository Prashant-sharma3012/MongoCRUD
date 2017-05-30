var express = require('express'),
    mongo = require('mongoose'),
    dbmodel = require('./dbmodel'),
    bodyParser = require('body-parser');

var app = express();

var user = new dbmodel();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/user', function(req, res) {

    let phone = req.query.phone;
    let email = req.query.email;

    dbmodel.find().where('phone').eq(phone).where('email').eq(email).exec(function(err, user) {
        if (err) throw err;
        res.send(user);
        res.end();
    });

});

app.post('/userad', function(req, res) {

    let email = req.body.email;
    let phone = req.body.phone;

    dbmodel.find().where('phone').eq(phone).where('email').eq(email).exec(function(err, usr) {
        if (err) {
            throw err;
        }

        if (usr[0] === undefined) {
            // add user first thne ad details
            console.log('Adding new user...')

            user.name = req.body.name;
            user.phone = req.body.phone;
            user.email = req.body.email;
            user.ads = [];

            user.save(function(err, added) {
                if (err) throw err;

                res.send(added);
                res.end();
            });
            return;
        }

        if (req.body.ads !== null) {
            console.log('Adding new ad...')

            var nextid = usr[0].ads.length + 1;
            let objad = {
                id: nextid,
                product: req.body.ads[0].product,
                desc: req.body.ads[0].desc,
                cost: req.body.ads[0].cost,
                location: req.body.ads[0].location,
                Contact: req.body.ads[0].contact
            };

            usr[0].ads.push(objad);

            usr[0].save(function(err, user) {
                if (err) throw err;

                res.send(user);
                res.end();
            });
        } else {
            res.send(user);
            res.end();
        }
    });
});

app.put('/useredit', function(req, res) {

    let phone = req.query.phone;
    let email = req.query.email;
    let adid = req.query.id - 1;
    let contact = req.body.ads[0].Contact;
    let product = req.body.ads[0].product;
    let desc = req.body.ads[0].desc;
    let cost = req.body.ads[0].cost;
    let location = req.body.ads[0].location;

    dbmodel.find().where('phone').eq(phone).where('email').eq(email).exec(function(err, usr) {
        if (err) {
            throw err;
        }

        usr[0].ads[adid].Contact = contact;
        usr[0].ads[adid].desc = desc;
        usr[0].ads[adid].location = location;
        usr[0].ads[adid].cost = cost;
        usr[0].ads[adid].product = product;


        usr[0].save(function(err, data) {
            if (err) throw err;
            res.send(data);
            res.end();
        });

    });

});

app.delete('/usrrmvad', function(req, res) {

    let phone = req.query.phone;
    let email = req.query.email;
    let adid = req.query.id - 1;

    dbmodel.find().where('phone').eq(phone).where('email').eq(email).exec(function(err, usr) {
        if (err) {
            throw err;
        }

        usr[0].ads.splice(adid, 1);

        usr[0].save(function(err, deleted) {
            if (err) throw err;
            res.send(deleted);
            res.end();
        });

    });

});

app.listen(3000, function() {
    console.log("the server is up on 3000");
});