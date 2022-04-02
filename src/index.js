const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');

//Inicializar
const app = express();
require('./lib/passport');


//configuraciones
app.set('port', process.env.PORT || 5000);


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  }))
  app.set('view engine', '.hbs');


//Middlewares

app.use(flash());
app.use(session({
    secret: 'nonamesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



//Variables globales
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/usuario', require('./routes/links'));


//Public
app.use(express.static(path.join(__dirname, 'public')));


const http = require('http')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

//Websocketsitos

io.on('connection', (socket)=>{
  console.log("nuevo usuario");
})

    //Startin the server
server.listen(app.get('port'), () =>{
  console.log('Server on port', app.get('port'));
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});






var Rollbar = require ( "rollbar" );
var rollbar = new Rollbar ({
   accessToken : 'adfc7455c9384a8e923d009142394c58' ,
   captureUncaught : true ,
   captureUnhandledRejections : true
});

// grabar un mensaje genérico y enviarlo a Rollbar 
rollbar.log ( "¡Hola mundo!" );