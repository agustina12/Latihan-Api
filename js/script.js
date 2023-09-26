function searchMovie(){
  $('#movie-list').html('')
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
        $.each(movies, function(i, data){
          $('#movie-list').append(`
          <div class="col-md-4"
            <div class="card mb-5" style="width: 18rem;">
              <img src="`+ data.Poster +`" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">`+ data.Title +`</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year+`</h6>
                <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="`+data.imdbID+`">See Detail </a>
              </div>
            </div>
          </div>
          `);
        });

        // menghilangkan histori kata kunci ditombol search 
        $('#search-input').val('');

      } else {
        $("#movie-list").html(
          `<h1 class="text-center">` + result.Error + `</h1>`
        );
      }
    },
  });
}
$("#search-button").on("click", function () {
  searchMovie();
});

// 13 itu keycode
$('#search-input').on('keyup', function(e){
  if(e.keyCode === 13) {
    searchMovie();
  }
})
