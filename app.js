var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/event')(app, mongoose);
var EventCtrl = require('./controllers/events');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var events = express.Router();

events.route('/events')
  .get(EventCtrl.findAllEvents)
  .post(EventCtrl.addEvent);

events.route('/events/:id')
  .get(EventCtrl.findById)
  .put(EventCtrl.updateEvent)
  .delete(EventCtrl.deleteEvent);

app.use('/api', events);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});