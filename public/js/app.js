$(document).ready(function() {
  $('select').material_select();

  $('#categoryselect').change(function() {
    $('.categories').hide();
    var categoryselect = $('#categoryselect').val();
    categoryselect = parseInt(categoryselect); // val() returns a string and we want an integer
    switch (categoryselect) {
      case 1:
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
