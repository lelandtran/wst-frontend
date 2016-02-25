var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
var slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var path = require('path');

// Define your routes here
var checkIn = require('./routes/checkIn');

app.set('io', io);
app.set('slack', slack);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.all('/', function(request, response) {
	response.status(404).send('Page not found.');
});

// URL paths defined here
app.get('/patientQueue', function(req,res){
	res.sendFile(path.join(__dirname+'/public/patientQueue.html'))});
app.get('/employees', function(req,res){
	res.sendFile(path.join(__dirname+'/public/employees.html'))});
app.get('/forms', function(req,res){
	res.sendFile(path.join(__dirname+'/public/forms.html'))});
app.get('/checkIn', checkIn.init);

var visitors = [];

io.on('connection', function(socket){
	console.log('populating list');
	socket.emit('send list', visitors);
	socket.on('update list',function(data){
		console.log(data);
		visitors.push(data);
		io.emit('send list',visitors);
	});

});





server.listen(3000);




