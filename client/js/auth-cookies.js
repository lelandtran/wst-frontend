var emailVal = '';

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkLoginCookie() {
    var email = getCookie("Email");

    // cookie already exists
    if(email != "") {
        // do something
    } else {
        // get Val from Log In
        email = $('#email').val();
        // set Cookie
        if (email != "" && email != null) {
           setCookie("Email", email, 365);
        }
    }
}

function checkLogoutCookie() {
    var email = getCookie("Email");

    if(email != "") {
        setCookie("Email", "", -1);
    } else {
        //do something
    }
}

// with Button named login-bt
$(function() {
	$('#login-bt').click(function () {
		checkLoginCookie();
	});
});

// with Button named signin-bt
$(function() {
    $('#logout-bt').click(function() {
        checkLogoutCookie();
    });
});