import IDataBase from "../applicationServices/database/IDataBase";
import MongoDataBase from "../applicationServices/database/MongoDataBase";
import IMessageReceiver from "../applicationServices/messages/listener/IMessageReceiver";
import MessageReceiver from "../applicationServices/messages/listener/MessageReceiver";
import IStatisticsUpdater from "../domainModel/logic/IStatisticsUpdater";
import StatisticsUpdater from "../domainModel/logic/StatisticsUpdater";
import IMessageExecuter from "../domainServices/executers/IMessageExecuter";
import UpdateStatisticsExecuter from "../domainServices/executers/UpdatePalabraStatisticsExecuter";
import ArtistaManager from "../domainServices/managers/ArtistaManager";
import CancionManager from "../domainServices/managers/CancionManager";
import IArtistaManager from "../domainServices/managers/IArtistaManager";
import ICancionManager from "../domainServices/managers/ICancionManager";
import IPalabraManager from "../domainServices/managers/IPalabraManager";
import PalabraManager from "../domainServices/managers/PalabraManager";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const keycloak = require('../applicationServices/config/keycloak').initKeycloak();
var session = require('express-session');

var cancionesRouter = require('../applicationServices/routes/cancion');
var artistasRouter = require('../applicationServices/routes/artista');
var palabrasRouter = require('../applicationServices/routes/palabras');

var corsOptions = {
  origin: ['http://localhost:4200/', 'http://168.62.39.210:3000/'],
  optionsSuccessStatus: 200
}

var app = express();

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/artistas', artistasRouter);
app.use('/palabras', palabrasRouter);
app.use('/canciones', cancionesRouter);

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: (arg0: any) => void) {
    next(createError(404));
  });
  
// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const rabbitHost = "amqp://"+process.env.rabbit_url
const connectionString =  'mongodb+srv://client:HzKRkF8M52TTjidj@cluster0.uaqcj.mongodb.net/test'
const updateStatisticsQueue = 'Speech'


let dataBase: IDataBase = new MongoDataBase(connectionString)
let messageReceiver: IMessageReceiver = new MessageReceiver(rabbitHost)
let statisticsUpdater: IStatisticsUpdater = new StatisticsUpdater()
let cancionManager: ICancionManager = new CancionManager(dataBase)
let artistaManager: IArtistaManager = new ArtistaManager(dataBase)
let palabraManager: IPalabraManager = new PalabraManager(dataBase, statisticsUpdater)
let updateStatisticsExecuter: IMessageExecuter = new UpdateStatisticsExecuter(palabraManager)

messageReceiver.setListener(updateStatisticsQueue, updateStatisticsExecuter)


export {app, corsOptions, cancionManager, artistaManager, palabraManager}
