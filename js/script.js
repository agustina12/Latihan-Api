$("#search-button").on("click", function () {
  $.ajax({
    url: "https://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "a3a4a62e",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        console.log(movies);
      } else {
        $("#movie-list").html(
          `<h1 class="text-center">` + result.Error + `</h1>`
        );
      }
    },
  });
});
