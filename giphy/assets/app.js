var topics = ["Mario", "Luigi", "Princess Peach", "Yoshi", "Toad", "Donkey Kong","Wario","Bowser"];

// Display the buttons on the screen
function createButtons() {
  $("#characterButtons").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("characterBtn btn btn-primary");
    a.attr("data-name", topics[i].toLowerCase());
    a.text(topics[i]);
    $("#characterButtons").append(a);
  }
}

//Creates new buttons for the page
$("#addCharacter").on("click", function(event) {
  event.preventDefault();
  var character = $("#character-input")
    .val()
    .trim();
  if (character != "") {
    topics.push(character);
    createButtons();
    $("input[type='text']").val("");
  } else {
    alert("Please enter a value");
  }
});

//Displays the character gifs on the page
function displayCharacters() {
  $("#characters").empty();
  var character = $(this).attr("data-name");
  var queryUrl =
  
    "https://api.giphy.com/v1/gifs/search?q=" +
    character +
    "&api_key=H5mLonS9aCPATr6KMH8vYFrJdyLODGwy&limit=10";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(res) {
    //puts still gifs on the page
    var result = res.data;

    for (var i = 0; i < result.length; i++) {
      console.log(res);
      var imgUrl = result[i].images.fixed_height_still.url;
      var image = $("<img>").attr("src", imgUrl);
      image.attr("data-still", result[i].images.fixed_height_still.url);
      image.attr("data-animate", result[i].images.fixed_height.url);
      image.attr("data-state", "still");
      image.addClass("characterClick card");
      $("#characters").append(image);
    }
  });
}

//click characters --THIS FUNCTION--
$(document).on("click", ".characterClick", function() {
  var state = $(this).attr("data-state");

  if (state == "still") {
    var url = $(this).attr("data-animate");
    $(this).attr("data-state", "animate");
    $(this).attr("src", url);
  } else {
    var url = $(this).attr("data-still");
    $(this).attr("data-state", "still");
    $(this).attr("src", url);
  }
});


$(document).on("click", ".characterBtn", displayCharacters);
//make the buttons
createButtons();
