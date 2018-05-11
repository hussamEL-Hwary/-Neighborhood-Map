var locations = [
  {name: 'Giza pyramids', show: true, location: {lat: 29.979322, lng: 31.132781}},
  {name: 'Dream land ', show: true, location: {lat: 29.976320, lng: 31.037594}},
  {name: 'Grand Egyptian Museum', show: true, location: {lat: 29.994948, lng: 31.118989}},
  {name: 'Cairo University', show: true, location: {lat: 30.026301, lng: 31.200953}},
  {name: 'Pyramid of Djoser',show: true, location: {lat: 29.871261, lng: 31.216554}}
];

var modelView = function(){
  var self = this;
  self.mapitems = [];
  self.search_text = ko.observable('');
  var infowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();  

  /* create markers */
  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      map: map,
      position: locations[i].location,
      title: locations[i].name,
      animation: google.maps.Animation.DROP,
      show: ko.observable(locations[i].show)
    });

    self.mapitems.push(marker);
    bounds.extend(self.mapitems[i].position);
  }
  map.fitBounds(bounds);



  
    /* function to make marker bounce */
    self.makeBounce = function(marker){
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null);}, 1500);
    };

    /* get wiki article */
    self.getMarkerInfo = function(marker){
      var wikiRequestTimeout = setTimeout(function() {
      marker.wikiInfo="Can't load data";
      }, 2000);
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + 
     marker.title + "&format=json&callback=wikiCallback";
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response) {
            var list = response[1];
            var link = "https://en.wikipedia.org/wiki/" + list[0];
              marker.wikiInfo=link;
              clearTimeout(wikiRequestTimeout);
        },
        error: function(e){
          marker.wikiInfo="Can't load data";
        }
    });
    };

    // add event to markers
    for(var i=0; i<self.mapitems.length; i++)
    {
      (function(marker){
        self.getMarkerInfo(marker);
        marker.addListener('click', function(){
          self.makeBounce(marker);
          self.createInfo(marker);
        });
      })(self.mapitems[i]);
    }

    /* create info window for selected marker */
    self.createInfo = function(marker){
     info = "<div> <h5>For more info read wikipedia article</h5> <a href='"+ 
     marker.wikiInfo+ "' target='_blank'>"+marker.wikiInfo+"</a> </div>" ;

     infowindow.setContent(info);
      infowindow.open(map, marker);
    };
}


/* create map */
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.979322, lng: 31.132781},
    zoom: 15
  });
  ko.applyBindings(new modelView());
}

/* handel map error */
function mapError(){
  $('#map-error').text("Sorry can't load the map try later :( ")
}

/* open and hide side bar */
function openNav() {
  $('.upper-nav').css("margin-left", "250px");
  $('#map').css("margin-left", "250px");
  $('#left-nav').css("width", "250px");
  $('.nav-icon').hide();
}

function closeNav() {
  $('.upper-nav').css("margin-left", "0");
  $('#map').css("margin-left", "0");
  $('#left-nav').css("width", "0");
  $('.nav-icon').show();
}