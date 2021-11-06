import IDataBase from "../applicationServices/database/IDataBase";
import MongoDataBase from "../applicationServices/database/MongoDataBase";
import IMessageReceiver from "../applicationServices/messages/listener/IMessageReceiver";
import MessageReceiver from "../applicationServices/messages/listener/MessageReceiver";
import IStatisticsUpdater from "../domainModel/logic/IStatisticsUpdater";
import StatisticsUpdater from "../domainModel/logic/StatisticsUpdater";
import IMessageExecuter from "../domainServices/executers/IMessageExecuter";
import InitializeStatisticsExecuters from "../domainServices/executers/InitializeStatisticsExecuter";
import UpdateStatisticsExecuter from "../domainServices/executers/UpdateStatisticsExecuter";
import IStatisticsManager from "../domainServices/managers/IStatisticsManager";
import StatisticsManager from "../domainServices/managers/StatisticsManager";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const keycloak = require('../applicationServices/config/keycloak').initKeycloak();
var session = require('express-session');

var statsRouter = require('../applicationServices/routes/stats');

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

app.use('/stats', statsRouter);

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
const initializeStatisticsQueue = 'initializeStatistics'
const updateStatisticsQueue = 'updateStatistics'


let dataBase: IDataBase = new MongoDataBase(connectionString)
let messageReceiver: IMessageReceiver = new MessageReceiver(rabbitHost)
let statisticsUpdater: IStatisticsUpdater = new StatisticsUpdater()
let statisticsManager: IStatisticsManager = new StatisticsManager(dataBase)
let initializeStatisticsExecuter: IMessageExecuter = new InitializeStatisticsExecuters(statisticsManager)
let updateStatisticsExecuter: IMessageExecuter = new UpdateStatisticsExecuter(statisticsManager, statisticsUpdater)

messageReceiver.setListener(initializeStatisticsQueue, initializeStatisticsExecuter)
messageReceiver.setListener(updateStatisticsQueue, updateStatisticsExecuter)


export {app, corsOptions, statisticsManager}
