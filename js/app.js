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