// Initial array of musicians
var band = ['Maroon 5', 'Jennifer Lopez', 'Ellie Goulding', 'One Direction', 'Ed Sheeran', 'Christina Aguilera', 'Ricky Martin', 'Spice Girls', 'Enrique Igelesia', 'Backstreet Boys'];
// displayMusicianInfo function now re-renders the HTML to display the appropriate content. 
function displayMusicianInfo() {
  // To empty the previously displayed images.
  $('#musicianView').empty();
  var musician = $(this).attr('data-name');
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + musician + "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    // Getting the data from the Query url and storing it in the variable.
    var results = response.data;
    // creating a for loop to get the results lenghth
    for (var i = 0; i < results.length; i++) {
      // making a div class image and storing it it the gifDiv variable.
      var gifDiv = $('<div class="image">')
      // 
      var rate = results[i].rating;
      // To make a paragraph tag and put it in a variable named p
      // set the text of the paragraph to the rating of the image in results[i]
      var p = $('<p>').text("Rating: " + rate);
      //To make an image and reference it in a variable named personImage
      var personImage = $('<img>');
      // set the image's src to results[i]'s fixed_height.url 
      personImage.attr('src', results[i].images.fixed_height_still.url);
      // append the p variable to the gifDiv variable
      gifDiv.append(p)
       // append the personImage variable to the gifDiv variable
      gifDiv.append(personImage)
      // append the gifDiv variable to the element with an id of musicianView
      $('#musicianView').append(gifDiv);
    }
  });
}
$( '#musicianView').click(function () {
   $(this).replaceWith("src", results[i].images.fixed_height.url);
});
// Generic function for displaying musician's data 
function renderButtons() {
  // Deletes the musicians prior to adding new musicians (this is necessary otherwise you will have repeat buttons)
  $('#buttonsView').empty();
  // Loops through the array of musicians
  for (var i = 0; i < band.length; i++) {
    // Then dynamicaly generates buttons for each musician in the array
    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
    a.addClass('music'); // Added a class 
    a.attr('data-name', band[i]); // Added a data-attribute
    a.text(band[i]); // Provided the initial button text
    $('#buttonsView').append(a); // Added the button to the HTML
  }
}
// ========================================================
// This function handles events where one button is clicked
$('#addMusician').on('click', function() {
  // This line of code will grab the input from the textbox
  var musician = $('#musician-input').val().trim();
  // The musician from the textbox is then added to our array
  band.push(musician);
  // Our array then runs which handles the processing of our band array
  renderButtons();
  // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
  return false;
});
// ========================================================
// Generic function for displaying the musicianInfo
$(document).on('click', '.music', displayMusicianInfo);
// ========================================================
// This calls the renderButtons() function
renderButtons();