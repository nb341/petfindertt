$(document).ready(function(){
    $('#login').click(function(){
     var username = $('#email').val();
     var password = $('#pwd').val();
     const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
     if($.trim(username).length > 0 && $.trim(password).length > 0)
     {
      $.ajax({
       url:"login/",
       method:"POST",
       headers: {'X-CSRFToken': csrftoken},
       data:{username:username, password:password},
       cache:false,
       beforeSend:function(){
        $('#login').val("connecting...");
       },
       success:function(data)
       {
           // alert(data);
        if(data.success)
        {
         window.location = "/";
        }
        else
        {
        
         
         $('#login').val("Login");
         $('#error').html("<span class='text-danger'>Invalid username or Password</span>");
        }
       }
      });
     }
     else
     {
       $('#error').html("<span class='text-danger'>Both Username and Password Required!</span>");  
     }
    });
   
   });