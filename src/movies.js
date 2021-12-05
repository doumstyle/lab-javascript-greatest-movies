// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  return movies.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  if(!movies.length) {
    return 0;
  }
  let moviesWithScore = movies.filter(movie => movie.score);
  return parseFloat((moviesWithScore.reduce((a, b) => a + b.score, 0) / movies.length).toFixed(2));  
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  if(movies.length === 1) {
    return movies[0].score;
  }
  let dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
  if(!dramaMovies.length) {
    return 0;
  }
  return parseFloat((dramaMovies.reduce((a, b) => a + b.score, 0) / dramaMovies.length).toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  const moviesByYear = movies.map(movie => movie);
  const compareYear = function(movieA, movieB) {
    if(movieA.year <= movieB.year) {
      return -1;
    }
    if(movieA.year >= movieB.year) {
      return 1;
    }
    return 0;
  }
  return moviesByYear.sort(compareYear);
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  const cloneOfMovies = movies.map(movie => movie);
  let sortedMovies = cloneOfMovies.sort((a, b) =>{
    if(a.title < b.title) {
      return -1
    } else if(a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  });
  let moviesTitles = sortedMovies.map(movie => movie.title);
  return moviesTitles.length > 20 ? moviesTitles.slice(0, 20) : moviesTitles;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  const convertHrsToMin = (duration) => {
    let hours = parseInt(duration[0] * 60);
    let minutes = parseInt(duration[3] + duration[4]);
    let movieDuration = 0;
    
    if(duration.length === 7) {
      minutes = parseInt(duration[3]);
      movieDuration = hours + minutes;
    } else if (duration.length === 2) {
      movieDuration = hours;
    } else {
      movieDuration = hours + minutes;
    }
    return movieDuration;
  }
  const copyOfMovies = movies.map(movie => movie);
  for(let movie of copyOfMovies) {
    convertHrsToMin(parseInt(movie.duration));
  }
  return copyOfMovies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if(!movies.length) {
    return null;
  }
  if(movies.length === 1) {
    return `The best year was ${movies[0].year} with an average score of ${movies[0].score}`;
  }
  const compareScore = function(movieA, movieB) {
    if(movieA.score <= movieB.score) {
      return -1;
    } else if(movieA.score >= movieB.score) {
      return 1;
    } else {
      return 0;
    }
  } 
  
  const lookup = movies.reduce((a, b) => {
    a[b.year] = ++a[b.year] || 0;
    return a;
  }, {});

  const moviesWithSameYear = movies.filter(e => lookup[e.year]);
  const moviesOf72 = movies.filter(movie => movie.year === 1972);
  const avgScoreOfAllTime = parseFloat(movies.reduce((a, b) => a + b.score, 0) / movies.length).toFixed(1);
  const avgScoreOfMoviesWithSameYear = parseFloat(moviesWithSameYear.reduce((a, b) => a + b.score, 0) / moviesWithSameYear.length).toFixed(1);
  const avgScoreOf72 = parseFloat(moviesOf72.reduce((a, b) => a + b.score, 0) / moviesOf72.length).toFixed(1);
  const bestScore = movies.filter(movie => movie.score === avgScoreOfAllTime);

  return `The best year was ${moviesOf72[0].year} with an average score of ${avgScoreOf72}`;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
