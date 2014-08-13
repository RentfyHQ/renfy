 $(document).ready(function() {
       Map();
      
  });
  function senddata(data,agent){
    $('#property').val(data);
    $('#agent_email').val(agent);
  }
  function HomepageMap() {

  var markers = new Array();
  var mapOptions = {
    center: new google.maps.LatLng( -6.82349, 39.26951),
    zoom: 14,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
     };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var status;
    $.each(locations, function(index, location) {

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location[0], location[1]),
            map: map,
            icon: 'http://themes.layero.com/grahawp/wp-content/themes/graha/images/marker-transparent.png',
             });
        var url = "'"+link[index]+"'";
        var agentemail = "'"+agent[index]+"'";
        //setting data for information window
      var myOptions = {
          content: '<div class="property_map_details"><div class="location">'+title[index]+'</div><div class="image"><a href="#">'+image[index]+'</a></div><div class="details"><div class="property-type">'+type[index]+'</div><div class="Area">'+area[index]+'</div><div class="Bathrooms">'+baths[index]+' Bathrooms</div><div class="Bedrooms">'+beds[index]+' Bedrooms</div></div><ul class="list-inline list4 clearfix">'+amenities[index]+'</ul><div class="contact"><a href="'+link[index]+'" class="btn btn-green">Read More</a><a  data-toggle="modal" href="#myModal" style="margin-left:10px;" onclick="senddata('+url+','+agentemail+'); return false;"  class="btn btn-green">Send Enquiry</a></div></div>',//content for information window
          disableAutoPan: false,
          maxWidth: 0,
          pixelOffset: new google.maps.Size(-250, -400),
          zIndex: null,
          closeBoxURL: "http://themes.layero.com/grahawp/wp-content/themes/graha/images/close-map.png",
          infoBoxClearance: new google.maps.Size(1, 1),
          position: new google.maps.LatLng(location[0], location[1]),
          isHidden: false,
          pane: "floatPane",
          enableEventPropagation: false
      };
      marker.infobox = new InfoBox(myOptions);
    marker.infobox.isOpen = false;
   
     //setting marker data
      var myOptions = {
          draggable: true,
      content: '<div class="map_bubble"><div class="bubble-map-image">'+mapicon[index]+'</div></div>',
      disableAutoPan: true,
      pixelOffset: new google.maps.Size(-21, -58),
      position: new google.maps.LatLng(location[0], location[1]),
      closeBoxURL: "",
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false
      };
      marker.marker = new InfoBox(myOptions);
      marker.marker.isHidden = false;
      marker.marker.open(map, marker);
      markers.push(marker);
      google.maps.event.addListener(marker, "click", function (e) {
            var curMarker = this;
            $.each(markers, function (index, marker) {
                // if marker is not the clicked marker, close the marker
                if (marker !== curMarker) {
                    marker.infobox.close();
                    marker.infobox.isOpen = false;
                }
            });

            if(curMarker.infobox.isOpen === false) {
                curMarker.infobox.open(map, this);
                curMarker.infobox.isOpen = true;
               map.panTo(this.position);
            } else {
                curMarker.infobox.close();
                curMarker.infobox.isOpen = false;
            }

        });
      
    });
    
google.maps.event.addListener(map, 'zoom_changed', function() {
                        jQuery.each(markers, function(index, marker) {
                            marker.infobox.close();
                            marker.infobox.isOpen = false;
                        });
                    });

                   
}

function Map(){
  google.maps.event.addDomListener(window, 'load', HomepageMap);
}


var locations = new Array();
  var mapicon = new Array();
  var title =  new Array();
  var image = new Array();
  var type = new Array();
  var status = new Array();
  var area = new Array();
  var beds = new Array();
  var baths = new Array();
  var amenities = new Array();
  var link = new Array();
  var agent = new Array();
  var i=0;