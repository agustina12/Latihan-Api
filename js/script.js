function searchMovie(){
  // menampilkan data movie
  $('#movie-list').html('');

  // menampilkan data movie dari api ajax
  $.ajax({
    url: "https://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      'apikey': "a3a4a62e",
      's': $("#search-input").val(),
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
                <a href="#" class="card-link see-details" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="`+data.imdbID+`">See Detail </a>
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

// mencari kata kunci movie
$("#search-button").on("click", function () {
  searchMovie();
});

// 13 itu keycode
$('#search-input').on('keyup', function(e){
  if(e.keyCode === 13) {
    searchMovie();
  }
});

// show data modal ketika sudah diklik link details
$('#movie-list').on('click', '.see-details', function() {
  $.ajax({
    url: "https://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      'apikey': "a3a4a62e",
      'i': $(this).data('id'),
    },
    success: function (movie){
      if(movie.Response === "True"){
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="`+ movie.Poster + `" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h4>`+ movie.Title +`</h4></li>
                  <li class="list-group-item">Released : `+ movie.Released +`</li>
                  <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                  <li class="list-group-item">Director : `+ movie.Director +`</li>
                  <li class="list-group-item">Actors : `+ movie.Actors +`</li>
                </ul>
              </div>
            </div>
          </div>
        `)
      }
    }
  });
});
