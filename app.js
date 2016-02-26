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
	phoneNumber: '3109851473',
	email: 'dakong@gmail.com'

}

var leland ={
	firstName : 'Leland',
	lastName : 'Tran',
	appointment : '2:45PM',
	checkin : '3:10PM',
	phoneNumber: '1234567889',
	email: 'leland@gmail.com'

}


var visitors = [daniel, leland];

io.on('connection', function(socket){
	//console.log('populating list');

	//Initialization of List
	socket.emit('send list', visitors);

	//Update Visitor List
	socket.on('update list',function(data){
		visitors.push(data);
		console.log(visitors);
		socket.emit('send list', visitors);
	});

	socket.on('send Id', function(data){
		/**TODO
		 * Search DB using a unique Identifier
		 */
		var selectedVisitor = findVisitor(data);;

		socket.emit('send visitorData', selectedVisitor);

	});

	socket.on('check-in-patient',function(id){

		var deleteVisitors= visitors.filter(function(el){
			return el.phoneNumber != id;
		});

		socket.emit('send list', deleteVisitors);

	});

});
console.log("test");

function findVisitor(data){
	for(var i = 0, len = visitors.length; i< len; i++){
		if(visitors[i]['phoneNumber'] === data){
			return visitors[i];
		}
	}
}

server.listen(3000);




