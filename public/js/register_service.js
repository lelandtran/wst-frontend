// On step 1
var nameVal = '';
var phoneVal = '';
var birthdateVal = '';
// On step 2
var usernameVal = '';
var email = '';
var password = '';

// On step 1
function nextStep() {
    nameVal = $('#name').val();
    phoneVal = $('#phone').val();
    birthdateVal = $('#birthdate').val();

    if(nameVal == '' || phoneVal == '' || birthdateVal == '') {
        errorMessage = 'Please provide Name, Phone Number, and Birthdate';
        return;
    } else if(phoneVal != 10 && phoneVal != 11) {
        errorMessage = 'Phone number should be 10-11 numbers long';
    } else {
        // correct info, do somthing 
    }
}

// On step 2
function completeRegister() {
    usernameVal = $('#username').val();
    emailVal = $('#email').val();
    passwordVal = $('#password').val();

    if(usernameVal == '' || emailVal == '' || passwordVal == '') {
        errorMessage = 'Please provide User Name, Email, and Password';
        return;
    } else if(passwordVal < 4) {
        errorMessage = 'Password must be at least 4 characters long';
    } else {
        register();
    }
}

function register() {
   
    $.ajax({
        // TODO: need to change url, it works now though
        url: "https://api.mongolab.com/api/1/databases/yojeon/collections/test?apiKey=DjGVsppWGUnfsk5CO93phhZJkaQ47J-u",
        data: JSON.stringify({ 
            "number" : nameVal,
            "phone" : phoneVal,
            "birthdate" : birthdateVal,
            "username" : usernameVal,
            "email" : emailVal,
            "password" : passwordVal
        }),
        type: "POST",
        contentType: "application/json"
        /*
        error: function(err) { alert("Could not connect to the registration server."); },
        success: function(data) {
            if (data.result != "success") {
                // something wrong
            } else {
                // thank you msg
                alert("thank you " + usernameVal);
            }
        }*/
    });
}