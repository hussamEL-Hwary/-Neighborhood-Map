var locations = [
  {name: 'Giza pyramids', location: {lat: 29.979322, lng: 31.132781}},
  {name: 'pyramids gardens', location: {lat: 29.971594, lng: 31.097261}},
  {name: 'The Grand Egyptian Museum', location: {lat: 29.994948, lng: 31.118989}},
  {name: 'Cairo University', location: {lat: 30.026301, lng: 31.200953}},
  {name: 'Giza pyramids', location: {lat: 29.871261, lng: 31.216554}}
];

/* create map */
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.979322, lng: 31.132781},
    zoom: 15
  });
  ko.applyBindings(modelView);
}

/* open and hide side bar */
function openNav() {
  $('.upper-nav').css("margin-left", "19%");
  $('#map').css("margin-left", "19%");
  $('#left-nav').css("width", "19%");
  $('.nav-icon').hide();
}

function closeNav() {
  $('.upper-nav').css("margin-left", "0");
  $('#map').css("margin-left", "0");
  $('#left-nav').css("width", "0");
  $('.nav-icon').show();
}