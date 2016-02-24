
$(document).ready(function(){


    var socket = io();

    //Updates Patient List
    socket.on('send list', function (data) {
    	console.log("sent list");
    	refreshList(data);
  	});

  	socket.emit('update list', function(data){
  		console.log('updating list to database');
  	});

  	function refreshList(list){
  		var compiledHtml = template(list);
    	$('#visitor-list').html(compiledHtml);
  	}

	var source = $("#visitor-list-template").html();
	var template = Handlebars.compile(source);



	/*var compiledHtml = template(visitors);
	$('#visitor-list').html(compiledHtml);*/


	/*
	var patientList = socket.on('patient list',function(patientList){
		var compiledHtml = template(patientList);
		$('#visitor-list').html(compiledHtml);
	});*/



});
