$(document).ready(function(){

    var socket = io();

    $('#tap-to-check').on('click',function(){
        console.log("click");
        //$('.check-in').addClass('show');
        $('.check-in').animate({
            top:'30%',
            opacity: '1'
        }, 700);
    });

    $('.check-in').on('submit', function() {

        console.log("data submitted");
        var data = grabFormElements();
        console.log(data);
        socket.emit('update list',data);

        $(this).animate({
            top:'35%',
            opacity:'0'
        },0);

    });



    //Grabs elements from the check in and puts it into an object
    function grabFormElements(){
        var newVisitor = {};
        newVisitor.firstName= $('#visitor-first').val();
        newVisitor.lastName = $('#visitor-last').val();
        newVisitor.appointment = $('#visitor-appointment').val();
        newVisitor.checkin = getCurrentTime();
        return newVisitor;
    }

    //Function to get Current Time of Check in
    function getCurrentTime(){
        var currentTime;
        var today = new Date();
        var currentHour = today.getHours();
        var currentMinute = today.getMinutes();

        if(currentMinute < 10){
            currentMinute = '0' + currentMinute;
        }

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






});
