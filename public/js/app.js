$(document).ready(function() {
  $('select').material_select();
  $('.parallax').parallax();

  $('#categoryselect').change(function() {
    $('.categories').hide();
    var categoryselect = $('#categoryselect').val();
    // categoryselect = parseInt(categoryselect); // val() returns a string and we want an integer
    switch (categoryselect) {
      case 'active, All': // 'amusementparks' change all switch cases to text instead of integers, remove the parseInt line
        $('#activeform').show();
        break;
      case 'arts, All':
        $('#artsform').show();
        break;
      case 'beautysvc, All':
        $('#beautyform').show();
        break;
      case 'food, All':
        $('#foodform').show();
        break;
      case 'hotelstravel, All':
        $('#hotelsform').show();
        break;
      case 'nightlife, All':
        $('#nightlifeform').show();
        break;
      case 'restaurants, All':
        $('#restaurantsform').show();
        break;
      case 'shopping, All':
        $('#shoppingform').show();
        break;
      }
  });

  $('form').submit(function(e) {
    e.preventDefault;
    var url = $(this).attr('action');
    $.ajax({
      dataType: 'json',
      url: url
    }).done(function(data) {
      console.log(data);
    });
  });


});
