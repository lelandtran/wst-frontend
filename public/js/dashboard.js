
$(document).ready(function(){

    var socket = io();

    //Updates Patient List
    socket.on('send list', function (data) {
    	console.log("sent list");
    	refreshList(data);
  	});

    //Function to refresh the view of the patient queue
    function refreshList(list){
  		var compiledHtml = template(list);
    	$('#visitor-list').html(compiledHtml);
  	}

    //Compile the handlebars template
	var source = $("#visitor-list-template").html();
	var template = Handlebars.compile(source);


});
