
$(document).ready(function(){


    var socket = io();

    //Updates Patient List
    socket.on('send list', function (data) {
    	console.log("sent list");
    	refreshList(data);
  	});

    $('.check-in').on('submit', function() {
        console.log("data submitted");
        var data = grabFormElements();
        socket.emit('update list',data);

    });

    function refreshList(list){
  		var compiledHtml = template(list);
    	$('#visitor-list').html(compiledHtml);
  	}



    //Grabs elements from the checkin and puts it into an object
    function grabFormElements(){
        var newVisitor = {};
        newVisitor.firstName= $('#visitor-first').val();
        newVisitor.lastName = $('#visitor-last').val();
        newVisitor.appointment = $('#visitor-appointment').val();
        newVisitor.checkin = getCurrentTime();
        return newVisitor;
    }

    // Function to get the time in when the patient checked in


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
