var buttons = ["Mario", "Luigi", "Princess Peach", "Yoshi", "Toad", "Donkey Kong", "Wario", "Bowser"];

function displayCharacterInfo() {
    $("#giphy-view").empty();
    var character = $(this).attr("data-name");
    console.log(character);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=H5mLonS9aCPATr6KMH8vYFrJdyLODGwy&limit=10";
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var characterDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var characterImage = $("<img>");
                characterImage.attr("src", results[i].images.fixed_height.url);
                characterDiv.append(p);
                characterDiv.append(characterImage);
                console.log(characterDiv);
                $("#giphy-view").prepend(characterDiv);
            }
        });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < buttons.length; i++) {
        var a = $("<button>");
        a.addClass("button");
        a.addClass("btn btn-default");
        a.attr("data-name", buttons[i]);
        a.text(buttons[i]);
        $("#buttons-view").append(a);
    }
}

$("add-giphy").on("click", function (event) {
    event.preventDefault();
    var character = $("#character-input").val().trim();
    buttons.push(character);
    renderButtons();
});

$(document).on("click", "button", displayCharacterInfo);
renderButtons();