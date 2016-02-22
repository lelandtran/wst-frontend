
$(document).ready(function(){

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

	var visitors = [visitor,visitorTwo,visitorThree,visitorFour];

	var source = $("#visitor-list-template").html();
	var template = Handlebars.compile(source);
	var compiledHtml = template(visitors);
	$('#visitor-list').html(compiledHtml);

	var socket = io();
	
	var patientList = socket.on('patient list',function(patientList){
		var compiledHtml = template(patientList);
		$('#visitor-list').html(compiledHtml);
	});



});
