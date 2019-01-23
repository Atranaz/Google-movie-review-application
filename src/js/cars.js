var movieFinder = (function(){
    
    var el = document.getElementById('findnow'),
    movieName = document.getElementById('movie-title'),
    movieYear = document.getElementById('movie-year'),
    movieTitleSection = document.getElementById('movie-title-section'),
    theFindarea = document.getElementById('find-movie'),
    theMoviearea = document.getElementById('movie-review'),
    ratingSection = document.getElementById('rating'),
    movietextArea = document.getElementById('movie-textarea'),
    moreInfobuuton = document.getElementById('moremovie-button'),
    hideSection = document.getElementById('hide-sections'),
    theSection = document.getElementById('hide-sections'),
    thesharebtn = document.getElementById('movie-share'),
    thePoparea = document.getElementById('pop-area');
  
    el.addEventListener('click', showMe);

    function movieOverview(data){
        
        console.log(data);
        let movieInfo = data.Year+' . '+data.Genre.replace(/, /g, "/")+' . '+data.Runtime,
            movieText = data.Plot,
            movieReleased = data.Released,
            movieDirector = data.Director,
            movieBoxOffice = data.BoxOffice,
            movieAwards = data.Awards,
            rateBody ='';

        movieTitleSection.innerHTML = `<h1 class="movie-title">${data.Title}</h1>
            <h3 class="movie-info">${movieInfo}</h3>`;
        data.Ratings.forEach(function(rate) {
            if(rate.Source === "Internet Movie Database") rate.Source = "IMDb";
            rateBody += `<a href="#">
            <span class='rating-scroe'>${rate.Value}</span>
            <span class='rating-source'>${rate.Source}</a>`;
        });
        ratingSection.innerHTML = rateBody;

        movietextArea.innerHTML = `<p>${data.Plot}</p>`

        var hideSectiontext =  `<div id="released" class="movie-awards movie-releasedate">
                                    <p>Release date: <span>${data.Released}</span></p></div>
                                    <div id="director" class="movie-awards movie-director">            
                                    <p>Director: <span>${data.Director}</span></p></div>
                                    <div class="movie-awards movie-film">
                                    <p>Box office: <span>${data.BoxOffice}</span></p>
                                </div>`;
        hideSection.innerHTML = hideSectiontext;
        
        
        moreInfobuuton.classList.toggle('hide-section');

        // //swiper slide
        let mySwiper = new Swiper ('.swiper-container', {
              
              slidesPerView: 3,
              spaceBetween: 4,
              breakpoints: {
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 4,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 4,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 4,
                },
                320: {
                  slidesPerView: 3,
                  spaceBetween: 4,
                }
            }
        });

        mySwiper.prependSlide('<div class="swiper-slide"><img src="'+data.Poster+'" data-jslghtbx></div>');
        mySwiper.slideTo(0,1000,true);
        mySwiper.init();

        let lightbox = new Lightbox();
        lightbox.load();
        theFindarea.classList.toggle('hide-section');
        theMoviearea.classList.toggle('show-section');
    }
    
    function getMovie(movieName,movieYear){
        url = 'https://www.omdbapi.com/?apikey=c2960c6d&t='+movieName+'&y='+movieYear+'';
		fetch(url).then(response => {
		if (!response.ok) {
		throw Error(response.statusText);
		}
		return response.json();
		}).then(data => {
			if(data.Response === "False"){ alert(data.Error); }
			else {
                //console.log(data);
                movieOverview(data);
			}
		}).catch(err => {
		    alert('Opps :/ API error');
		});
    }

    function sliderBox(){

    }

    thesharebtn.onclick = function(){
		thePoparea.classList.toggle('show-section');
	};
	moreInfobuuton.onclick = function () {
		theSection.classList.toggle('show-section');
		moreInfobuuton.classList.toggle('up-arrow');
	};
    
    function showMe(name,checkyear){
        getMovie(movieName.value,movieYear.value);
    }
    

    
    return {
        showMe: showMe
    }
    
    
    })();

exports = movieFinder;