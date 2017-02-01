(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  let search = document.getElementById('search');
  let formTag = document.getElementsByTagName('form')[0];
  formTag.addEventListener('submit', function(event){
    event.preventDefault();
    // console.log(formTag);
    let result = search.value
    // console.log(result);
    let response = getOMDB(result);
    console.log(response);
  });

  function getOMDB(title){
    let url = `http://www.omdbapi.com/?s=${title}` //movie title
    return fetch(url)
    .then(function(response){
      // console.log(response);
      return response.json();
    })
    .then(function(jsonResponse){
      // console.log(jsonResponse);
      for (let i = 0; i < movies.length; i++) {
        console.log("spliced?");
        movies.splice(0,1);  //no idea why spliced worked and not pop
        // console.log(movies);
      }
      // console.log(movies, "movies");
      let arrayofMovies = jsonResponse.Search;
      console.log(arrayofMovies);
      for (let i = 0; i < arrayofMovies.length; i++) {
        // console.log(movies);
        movies.push({
          id: arrayofMovies[i]['imdbID'],
          poster: arrayofMovies[i]['Poster'],
          title: arrayofMovies[i]['Title'],
          year: arrayofMovies[i]['Year']
        });
        // console.log(movies);
      }
      renderMovies();
    })
  }

})();
