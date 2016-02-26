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
var daniel ={
	firstName : 'Daniel',
	lastName : 'Kong',
	appointment : '2:30PM',
	checkin : '3:00PM',
	phoneNumber: '3109851473'

}

var leland ={
	firstName : 'Leland',
	lastName : 'Tran',
	appointment : '2:45PM',
	checkin : '3:10PM',
	phoneNumber: '1234567889'

}


var visitors = [daniel, leland

];

io.on('connection', function(socket){
	console.log('populating list');

	//Initialization of List
	socket.emit('send list', visitors);

	//Update Visitor List
	socket.on('update list',function(data){
		console.log(data);
		visitors.push(data);
		io.emit('send list',visitors);
	});

	socket.on('send Id', function(data){
		/**TODO
		 * Search DB using a unique Identifier
		 */
		console.log(data);
		var selectedVisitor;
		for(var i = 0, len = visitors.length; i< len; i++){
			if(visitors[i]['phoneNumber'] === data){
				selectedVisitor = visitors[i];
				console.log(selectedVisitor);
				break;
			}
		}

		socket.emit('send visitorData', selectedVisitor);


	});

});
console.log("test");

server.listen(3000);




