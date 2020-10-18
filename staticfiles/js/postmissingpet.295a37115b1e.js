var lat;
var long;


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}



function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    document.getElementById('lat').value = lat;
    document.getElementById('long').value = long;
}
var map;
var marker;
var myLatlng = new google.maps.LatLng(10.777730, -61.176800);
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();

function initialize() {
    var mapOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

    marker = new google.maps.Marker({
        map: map,
        position: myLatlng,
        draggable: true
    });
  
    google.maps.event.addListener(marker, 'dragend', function() {

        geocoder.geocode({ 'latLng': marker.getPosition() }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('#address99').val(results[0].formatted_address);
                    $('#lat').val(marker.getPosition().lat());
                    $('#long').val(marker.getPosition().lng());
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                }
            }
        });
    });

}
google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(function() {

    $('#missingpets_sub').on('click', function(e) {
        e.preventDefault();
        $('#missingpets_sub').attr('disabled', 'disabled');
        var pn = $('#pet_name_enter').val();
        if (pn.length == 0) {
            var pnerr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Pet name REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#pn-err').html(pnerr);
        }
        var at = $('#a_type').val();
        if (at.length == 0) {
            var aterr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Animal type REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#at-err').html(aterr);
        }
        var br = $('#breed').val();
        if (br.length == 0) {
            var brerr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Breed REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#br-err').html(brerr);
        }
        var pd = $('#pet_description').val();
        if (pd.length == 0) {
            var pderr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>A description of your pet is REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#pd-err').html(pderr);
        }
        var ppp = $('#main_pic').val();
        if (ppp.length == 0) {
            var ppperr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>A picture of your pet is REQUIRED!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#ppp-err').html(ppperr);
        }
        var lat = $('#lat').val();
        var lng = $('#long').val();
        if (lat.length == 0 && lng.length == 0) {
            var ppperr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>You must enter the last seen location of your pet!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#loc-err').html(ppperr);
        }
        var petpic = $('#pet_pic').val();
        if (petpic.length == 0) {
            var pperr = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>You must enter enough pictures to ensure your pet is RECOGNISABLE!</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>';
            $('#petpic-err').html(pperr);
        }
        var doAjax = petpic.length && lat.length && pd.length && ppp.length && br.length && at.length && pn.length;
        if (doAjax == 0) {
            $('#missingpets_sub').removeAttr('disabled');
        }
        console.log(petpic.length + " " + lat.length + " " + pd.length + " " + ppp.length + " " + br.length + " " + at.length + " " + pn.length);
        console.log(doAjax);
        if (doAjax != 0) {
            var form = $('#missingpets')[0];
            var formData = new FormData(form);
            // Set header if need any otherwise remove setup part
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="token"]').attr('value')
                }
            });
            $.ajax({
                url: 'PostMissingPetsAction.php', // your request url
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                dataType: 'json',
                beforeSend: function() {
                    $('#missingpets_sub').val('Posting pet....');
                },
                success: function(data) {
                    console.log(data);
                    if (data) {
                        var msg = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            '<strong>' + data.msg + '</strong>' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button></div>';
                        $('#success').html(msg);
                    }
                },
                error: function() {

                }
            });

        }
    });
});