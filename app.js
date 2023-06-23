const http = require('http');
var express = require('express');
const socketIO = require('socket.io');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const server = http.createServer(app);
const serialport = require('serialport').SerialPort;
const { DelimiterParser } = require('@serialport/parser-delimiter');


src="https://cdn.socket.io/4.3.1/socket.io.min.js"

const puerto = new serialport(
    {
        path: '/dev/cu.usbmodem1401',
        baudRate: 9600
    });

    const parser = puerto.pipe(new DelimiterParser({ delimiter: "\n"}))

    parser.on('open', function (){
        console.log('Conexion abierta');
    });

    parser.on('data', function(data){
        var enc = new TextDecoder();
        var arr = new Uint8Array(data);
        ready = enc.decode(arr);
      let temperatura = parseInt(data, 10) + " °C";
      console.log(temperatura);
      //io.emit('temperatura', data);
    });

    puerto.on('error', function (err){
        console.log(err);
});




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

hbs.registerPartials(path.join(__dirname, 'views'), (err) => {});
hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {});
hbs.registerPartials(path.join(__dirname, 'views/component'), (err) => {});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/api', usersRouter);


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
 



module.exports = app;
