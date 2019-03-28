var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});


// Remove below code and add own port due to clashing 
// module.exports = app;

// Add code below

app.listen(8080);

var express = require('express');
var router = express.Router();
var Pokemon = require('../db.json');
var request = require("request");

router.get('/:pokeId', function (req, res, next) {
    //make a post request to our database
    request({
        uri: "http://localhost:8000/pokemon/" + req.params.pokeId,
        method: "GET",
    }, function (error, response, body) {
        console.log(JSON.parse(body));
        //send a response message
        res.render('view', {
            poke: JSON.parse(body)
        });
    });
})

module.exports = router;
