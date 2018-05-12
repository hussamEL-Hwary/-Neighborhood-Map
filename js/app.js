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

  /**
   * @description create markers 
   */ 
  locations.forEach(function(location){
    var marker = new google.maps.Marker({
      map: map,
      position: location.location,
      title: location.name,
      animation: google.maps.Animation.DROP,
      show: ko.observable(location.show)
    });

    self.mapitems.push(marker);
    bounds.extend(location.location);
  });
  map.fitBounds(bounds);
  
  /**
   *@description function to make marker bounce 
   */
  self.makeBounce = function(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null);}, 700);
  };

  /**
   * @description get wiki article  via ajax request
   * and handel request error
   */
  self.getMarkerInfo = function(marker){
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + 
    marker.title + "&format=json&callback=wikiCallback";
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
    })
    .done(function(response) {
        var list = response[1];
        var link = "https://en.wikipedia.org/wiki/" + list[0];
        marker.wikiInfo=link;
      })
    .fail(function(){
         marker.error="Can't load data";
        });
  };

  /**
   *@description add event to markers 
   */
  self.mapitems.forEach(function(marker){
    self.getMarkerInfo(marker);
    marker.addListener('click', function(){
    self.makeBounce(marker);
    self.createInfo(marker);
  });
  });
  /**
   * @description create info window for selected marker
   */
  self.createInfo = function(marker){
    if(marker.wikiInfo !=undefined){
    info = "<div> <h5>For more info read wikipedia article</h5> <a href='"+ 
    marker.wikiInfo+ "' target='_blank'>"+marker.wikiInfo+"</a> </div>" ;
    infowindow.setContent(info);
  }else{
    info = "<div> <h4>"+marker.error+"</h4></div>";
    infowindow.setContent(info);
  }
    infowindow.open(map, marker);
  };

  /**
   * @description show place info when title clicked 
  */
  self.titleClicked = function(marker){
    google.maps.event.trigger(marker, 'click');
  };

  /**
   * @description filter place title and markers
  */
  self.searchFilter = function(){
    if(self.search_text().length === 0){
      self.showAllMarkers();
    }
    else{
      self.mapitems.forEach(function(mapitem){
        if(mapitem.title.toLowerCase().indexOf(self.search_text().toLowerCase()) != -1){
          mapitem.show(true);
          mapitem.setVisible(true);
        }else{
          mapitem.show(false);
          mapitem.setVisible(false);
        }
      });
    }
  };

  /**
   * @description view places titles and markers
   */
  self.showAllMarkers = function(){
    self.mapitems.forEach(function(mapitem){
      mapitem.show(true);
      mapitem.setVisible(true);
    });
  };
}

/**
 * @description create map 
*/
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.979322, lng: 31.132781},
    zoom: 15
  });
  ko.applyBindings(new modelView());
}

/**
 * @description handel map error
*/
function mapError(){
  $('#map-error').text("Sorry can't load the map try later :( ")
}

/**
 * @description open and hide side bar
*/
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
