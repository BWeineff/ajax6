
// buttons variables, for loop for creating buttons based off the variables
var topics = ['rick and morty', 'bojack horseman', 'archer', 'aqua teen hunger force', 'simpsons', 'sealab 2021', 'metalocalypse' , 'south park', 'samurai jack', 'adventuretime']

arrayButtons();

function arrayButtons() {

    $("#buttonsDiv").empty();
    for (var i = 0;i < topics.length;i++) {
        var topicButton = $('<button class="btn topicsClass btn-primary btn-sm"  data-name="' + topics[i] + '">' + topics[i] + '</button>')
        $('#buttonsDiv').append(topicButton)
};
};
// funciton for new input from form button is clicked
$("#add-cartoon").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();

    // new input from the textbox to array
    topics.push(cartoon);

    arrayButtons();

  });



// Adding click event listen listener to all .topicsClass buttons
function giphy() {
    // Creating, Grabbing, and storing the data-topicName property value from the button
    var topicName = JSON.stringify($(this).attr("data-name"));

    // Constructing a queryURL using the topic name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topicName + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        console.log(results)
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var gifsDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var gifsImage = $("<img class='gif' data-state>");
          // Setting the src attribute of the image to a property pulled off the result item
          gifsImage.attr("src", results[i].images.fixed_height_still.url);
          // setting the alt to the appropriate name in case image dont load
          gifsImage.attr("alt", topicName);
          // adding attr to gif img
          gifsImage.attr("data-state", "still");
          //creating data-still and data-animate attributes one the gifsimage image for later use   
          gifsImage.attr("data-still", results[i].images.fixed_height_still.url)
          gifsImage.attr("data-animate", results[i].images.fixed_height.url)
          // Appending the paragraph and image tag to the gifsDiv
          gifsDiv.append(gifsImage);
          gifsDiv.append(p);

          // Prependng the gifsDiv to the HTML page in the "#gifsDiv" div
          $("#gifsDiv").prepend(gifsDiv);
        }

        $(".gif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
      });
  };

  $(document).on("click", ".topicsClass", giphy);