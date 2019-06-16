var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var router = express.Router();
var app = express();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

app.use(cors())

// view engine setup
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())



app.set("app", path.join(__dirname, "app"));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'jade');
app.use(express.static(__dirname + "views"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/users', function(req, res, next) {
    res.sendFile(__dirname + "/views/user.html");
});

app.post("/send", function(req, res) {

    const msg = {
        to: "harshi0901@gmail.com",
        from: "harshi0901@gmail.com",
        template_id: "d-700d1726a1f04ffda337919b678e4c70",
        dynamic_template_data: {
            userName: 'Harshi',
            companyName: 'XYZ'
        }

    };

    sgMail
        .send(msg, (error, result) => {
            if (error) {
                res.send('')
            } else {
                res.send("Mail Sent")
            }
        });
    console.log(msg);

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;