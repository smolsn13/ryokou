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



  // $('form').submit(function(e) {  // submit function for the forms
  //   e.preventDefault();
  //   var url = $(this).attr('action');
  //   $.ajax({
  //     dataType: 'json',
  //     url: url
  //   }).done(function(data) {
  //     console.log(data);
  //   });
  // });

  $('.delete-link').click(function(e) { // prevents normal click function, sends ajax call to Delete route
    e.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      method: 'DELETE'
    }).success(function(data) {
      window.location.href = "/trips/show";
    });
  });

  $('#edit-biz').submit(function(e) {
    e.preventDefault();  //prevents the GET request it would normally perform
    $.ajax({
      url: $(this).attr('action'),
      method: 'PUT',
      data: {
        category: $('#newcategory').val()
      }
    }).success(function(data) {
      window.location.href = "/trips/show";
    });
  });

});
