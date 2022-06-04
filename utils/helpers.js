module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  //maybe throw in the cloudinary stuff into helper folder?
};

// helper for dashboard 
// (function(){
//   var theScriptHTML = document.getElementById('greeting-template').innerHTML;
//   var theTemplate = Handlebars.compile(theScriptHTML);
//   var contextObj = {name: "Katya"};
//   var compiledData = theTemplate(contextObj);

//   document.getElement('greeting-template').innerHTML = compiledData;
// } ());

// helper for spotify artist

// function getArtistAdapter(){
//   event.preventDefault();
//   var artist = $('#artistQuery').val();

//   $.ajax({
//     method: 'GET',
//     url: 'http://api.spotify.com/v1/artists/5WUlDfRSoLAfCVSX1WnrxN/top-tracks?country=US',
//     }).done(function(data){
//       getSongController(data);
//     })

// }

// function getSongController(data){
//   var theScriptHTML = $("#songListTemplate")[0].innerHTML;
//   var theTemplate = Handlebars.compile(theScriptHTML);
//   var contextObj = theTemplate(data.tracks);
//   $("#songs").append(contextObj);
// }