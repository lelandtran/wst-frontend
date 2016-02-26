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

/**
 * HARDCODED PATIENT VALUES
 */
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


/**
 * Sockets for the Visitor Queue
 */
io.on('connection', function(socket){
	//console.log('populating list');

	//Initialization of List
	socket.emit('send list', visitors);

	//Update Visitor List
	socket.on('update list',function(data){
		visitors.push(data);
		io.emit('send list', visitors);
	});

	//Socket for finding visitor data on the modal
	socket.on('send Id', function(data){

		/**TODO
		 * Search DB using a unique Identifier
		 */
		var selectedVisitor = findVisitor(data);
		io.emit('send visitorData', selectedVisitor);

	});

	//Socket for updating the visitor queue when someone is checked in
	socket.on('check-in-patient',function(id){

		var deletedVisitors = visitors.filter(function(el){
			return el.phoneNumber != id;
		});

		io.emit('send list', deletedVisitors);

	});

});

function findVisitor(data){
	for(var i = 0, len = visitors.length; i< len; i++){
		if(visitors[i]['phoneNumber'] === data){
			return visitors[i];
		}
	}
}

server.listen(3000);




