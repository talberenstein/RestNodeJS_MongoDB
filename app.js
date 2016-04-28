var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/events', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

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