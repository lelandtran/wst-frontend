var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/public'));

app.all('/', function(request, response) {
	response.status(404).send('Page not found.');
});


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




