var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/public'));

app.all('/', function(request, response) {
	response.status(404).send('Page not found.');
});

var visitor ={
		name: "Eric",
		appointment: "2:30PM",
		checkin: "2:15PM"
	}

	var visitorTwo ={
		name: "Daniel",
		appointment: "2:15PM",
		checkin: "2:03PM"
	}

	var visitorThree ={
		name: "Bob",
		appointment: "2:10PM",
		checkin: "2:05PM"
	}

	var visitorFour ={
		name: "Joe",
		appointment: "1:40PM",
		checkin: "1:37PM"
	}

var visitors = [visitor,visitorTwo];
io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('send list', visitors);

});

io.on('updated list',function(updatedList){
	io.emit('send list',visitors);
});

server.listen(3000);

var visitor = {
	name: "Eric",
	appointment: "2:30PM",
	checkin: "2:15PM"
}
console.log("sending over: " + visitor.name);



