$(document).ready(function() {
  $('select').material_select(); // this is for the Materialize select dropdowns
  $('.parallax').parallax();  // this is for the Materialize parallax on the homepage

  $('#categoryselect').change(function() {
    $('.categories').hide();
    var categoryselect = $('#categoryselect').val();
    switch (categoryselect) {
      case 'active, All': // switch case looks for which parent category was selected, displays next form
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

  $('.delete-link').click(function(e) { // prevents normal click function, sends ajax call to Delete route
    e.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      method: 'DELETE'
    }).done(function(res) {
      window.location.href = "/trips/" + res.id;
    });
  });

  $('.edit-biz').on('click', function(e) {
    e.preventDefault();  //prevents the GET request it would normally perform
    var url = $('.edit-form').attr('action');
    $.ajax({
      url: url,
      method: 'PUT',
      data: {
        category: $('#newcategory').val()
      }
    }).done(function(res) {
      window.location.href = "/trips/" + res.id;
    });
  });

});
