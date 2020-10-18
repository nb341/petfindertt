function checkUser() {
    $("#uname_").on('change', (function() {
        var uerr = '<div class="alert alert-warning alert-dismissible fade show" role="alert">' +
            '<strong>Checking........</strong>' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button></div>';
        $('#uname-err').html(uerr);
        var apt = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
            '<strong>User name available</strong>' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button></div>';
        var napt = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
            '<strong>User not available</strong>' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button></div>';
        var un = $("#uname_").val();
        $.ajax({
            url: '/checkUser/',
            type: 'GET',
            data: { uname_: un },
            dataType: 'json',
            success: function(data) {
                console.log(data.available)
                if (data.available) {
                    $('#uname-err').html(apt);
                } else {
                    $('#uname-err').html(napt);
                }
                // if(data[0].available)

                //  console.log(data);
            },
            error: function() {

            }
        });
    }));
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    const $result = $("#result");
    const email = $("#email").val();
    $result.text("");

    if (validateEmail(email)) {
        $result.text(email + " is valid :)");
        $result.css("color", "green");
    } else {
        $result.text(email + " is not valid :(");
        $result.css("color", "red");
    }
    return false;
}

$("#validate").on("click", validate);
$(document).ready(function() {
    checkUser();
    $('#create_user').on('click', function(e) {
        e.preventDefault();
        $('#create_user').attr('disabled', 'disabled');
        var options = $.trim($('#user_option').val());
        var fname_ = $.trim($('#fname_').val());
        var lname_ = $.trim($('#lname_').val());
        var uname_ = $.trim($('#uname_').val());
        var email_ = $.trim($('#email_').val());
        var phone_ = $.trim($('#phone_').val());

        var inlineRadioOptions = '';
        a = $('#inlineRadio1').val();
        b = $('#inlineRadio2').val();
        if ($("#inlineRadio1").is(":checked")) {
            inlineRadioOptions = $('#inlineRadio1').val();
        } else if ($("#inlineRadio2").is(":checked")) {
            inlineRadioOptions = $('#inlineRadio2').val();
        }
        var pass = $.trim($('#pass').val());
        var r_pass = $.trim($('#r_pass').val());
        var certs = $('#certificate').val();
        if (options != 'Veternarian') {
            cert = "";
        }
        console.log(uname_.length + " " + email_.length + " " + inlineRadioOptions.length + " " + pass.length + " " + r_pass.length)
        var doAjax = uname_.length && email_.length && inlineRadioOptions.length && pass.length && r_pass.length;
        if (uname_.length == 0) {
            var uerr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>User name REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#uname-err').html(uerr);
        }

        if (email_.length == 0) {
            var eerr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Email is REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#email-err').html(eerr);
        }
        if (email_.length > 0) {
            const re = /\S+@\S+\.\S+/;
            console.log(re.test("dgsfsgfgfgsf " + email_))
            if (!re.test(email_)) {
                var eerr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                    '<strong>Invalid Email Address!</strong>' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button></div>';
                $('#email-err').html(eerr);
            } else {
                doAjax = doAjax && 1;
            }
        }
        if (inlineRadioOptions.length == 0) {
            var gerr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Gender REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#gender-err').html(gerr);
        }


        if (pass.length == 0) {
            var perr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Password REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#pass-err').html(perr);
        }
        if (r_pass.length == 0) {
            var rperr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Repeat Password REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#pass1-err').html(rperr);
        }
        /* if(r_pass.length>pass.length || pass.length>r_pass.length && r_pass.length>0 && pass.length>0 ){
           var perr =  '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                       '<strong>BOTH Password fields are REQUIRED!</strong>'+
                       '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                       '<span aria-hidden="true">&times;</span>'+
                       '</button></div>';
                       $('#pass-err').html(perr);
         }*/
        if (r_pass != pass) {
            var perr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Passwords must match!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#pass-err').html(perr);
        }
        if ((r_pass == pass) && (r_pass.length > 0 && pass.length > 0)) {
            var perr = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                '<strong>Passwords match!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#pass-err').html(perr);
        }
        if (doAjax == 0) {
            $('#create_user').prop('disabled', false);
        }
        console.log(doAjax + " this the the value")
        if (doAjax != 0) {
            var form = $('#create_user_form')[0];
            var formData = new FormData(form);
            // Set header if need any otherwise remove setup part
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('[name=csrfmiddlewaretoken]').attr('value')
                }
            });
            $.ajax({
                url: '/sign-up/', // your request url
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                beforeSend: function() {
                    $('#create_user').val('Creating User....');
                },
                success: function(data) {
                    console.log(data);
                    if (data.success) {
                        var msg = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            '<strong>Welcome to the PetFinderTT Community</strong>' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button></div>';
                        $('#success').html(msg);
                        window.setTimeout(function() {
                            window.location.href = "/"
                        }, 5000);
                    } else {

                        var msg = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            '<strong>User not added</strong>' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button></div>';
                        $('#success').html(msg);
                        window.setTimeout(function() {
                            window.location.href = "/sign-up/"
                        }, 5000);
                    }

                },
                error: function() {

                }
            });

        }
    });
});
function display() {
    var x = document.getElementById("user_option").value;
    if(x=="Veterinarian"){
    document.getElementById("cert-form").style.display = "block";
    document.getElementById("lname_").style.display = "block";
    document.getElementById("fname_").style.display = "block";
    }
    else if(x=="Shelter" && x!="Veterinarian"){
      document.getElementById("lname_").style.display = "none";
      document.getElementById("fname_").style.display = "none";
      document.getElementById("cert-form").style.display = "none";
    }else{
        document.getElementById("cert-form").style.display = "none";
        document.getElementById("lname_").style.display = "block";
        document.getElementById("fname_").style.display = "block";
    }
  }