var _long;
var _lat;


function showlocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        callback(position.coords.latitude, position.coords.longitude);
    });
}

function callback(lat, lon) {
    //document.getElementById('latitude').innerHTML = lat;
    //document.getElementById('longitude').innerHTML = lon;

    document.getElementById('lat').value = lat;
    document.getElementById('long').value = lon;

}
//check if display = block, if true run function

function display() {
    var x = document.getElementById("loc-select").value;
    /* if (x == "c_loc") {
         document.getElementById("address_1").style.display = "block";
     } else {
         document.getElementById("address_1").style.display = "none";
     } */
    if(x == "c_loc") {
      showlocation();
        document.getElementById("address").style.display = "none";
    } else if(x=="none") {
        document.getElementById("address").style.display = "none";
    }
    else if(x=="e_loc"){
      document.getElementById("address").style.display = "block";
    }

}