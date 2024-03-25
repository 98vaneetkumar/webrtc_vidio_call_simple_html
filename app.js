var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const http=require('http').createServer(app)
const io=require("socket.io")(http)
// require("./socket")(io)
const users = new Map();

app.get('/users', (req, res) => {
  return res.json(Array.from(users));
});
io.on("connection",(socket)=>{
  console.log(`user connected: ${socket.id}`);
  users.set(socket.id, socket.id);

  // emit that a new user has joined as soon as someone joins
  socket.broadcast.emit('users:joined', socket.id);
  socket.emit('hello', { id: socket.id });

  socket.on('outgoing:call', data => {
      const { fromOffer, to } = data;

      socket.to(to).emit('incomming:call', { from: socket.id, offer: fromOffer });
  });

  socket.on('call:accepted', data => {
      const { answere, to } = data;
      socket.to(to).emit('incomming:answere', { from: socket.id, offer: answere })
  });


  socket.on('disconnect', () => {
      console.log(`user disconnected: ${socket.id}`);
      users.delete(socket.id);
      socket.broadcast.emit('user:disconnect', socket.id);
  });

})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
app.listen(3000,(req,res)=>{
  console.log(`listening on 3000`)
})

module.exports = app;
