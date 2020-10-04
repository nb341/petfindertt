$(document).ready(function(){
    $('#login').click(function(){
     var username = $('#email').val();
     var password = $('#pwd').val();
     if($.trim(username).length > 0 && $.trim(password).length > 0)
     {
      $.ajax({
       url:"login.php",
       method:"POST",
       data:{username:username, password:password},
       cache:false,
       beforeSend:function(){
        $('#login').val("connecting...");
       },
       success:function(data)
       {
           // alert(data);
        if(data)
        {
           
         window.location = "index.php";
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