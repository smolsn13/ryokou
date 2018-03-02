$(document).ready(function() {
  $('.categories').hide();
  $('select').material_select();

  var categoryselect = $('#categoryselect').val();

  switch (categoryselect) {
    case 'Active Lifestyle':
      $('#activeform').show();
      break;
    case 2:
      $('#entertainmentform').show();
      break;
    case 3:
      $('#beautyform').show();
      break;
    case 4:
      $('#foodform').show();
      break;
    case 5:
      $('#hotelsform').show();
      break;
    case 6:
      $('#nightlifeform').show();
      break;
    case 7:
      $('#restaurantsform').show();
      break;
    case 8:
      $('#shoppingform').show();
      break;
    }
 });
