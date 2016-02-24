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
app.post('/process_post', urlencodedParser, function (req, res) {
	console.log("post receieved");
	// Prepare output in JSON format
	response = {
		firstName:req.body.first,
		lastName:req.body.last,
		appointment:req.body.appointment_time
	};

	response.checkin = getCurrentTime();
	console.log(response);

	visitors.push(response);
	io.emit('send list', visitors);
});

//Function to get Current Time
function getCurrentTime(){
	var currentTime;
	var today = new Date();
	var currentHour = today.getHours();
	var currentMinute = today.getMinutes();

	if(currentHour >= 13){
		currentHour = currentHour - 12;
		currentTime = currentHour + ':' + currentMinute + 'PM';
	}
	else if(currentHour === 12){
		currentTime = currentHour + ':' + currentMinute + 'PM';
	}
	else if (currentHour === 0)
		currentTime = 1 + ':' + currentMinute + 'AM';
	else
		currentTime = currentHour + ':' + currentMinute + 'AM';

	return currentTime;

}

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('send list', visitors);

});

io.on('updated list',function(updatedList){
	io.emit('send list',visitors);
});

server.listen(3000);




