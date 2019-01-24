var coreFunctions = (function() {
    // for fixed header
    window.onscroll = function changeClass(){
        var scrollPosY = window.pageYOffset | document.body.scrollTop,
            sticky = document.getElementById('stickyHead');
        if(scrollPosY > 10) {
              sticky.className = ('stickybar-area fixed-me');
        } else if(scrollPosY <= 10) {
             sticky.className =  ('stickybar-area');
        }
    };
    // tab menu 
    [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
        var menuItems = menu.querySelectorAll('.menu__link'),
            setCurrent = function(ev) {
                ev.preventDefault();
    
                var item = ev.target.parentNode; // li
    
                // return if already current
                if (classie.has(item, 'menu__item--current')) {
                    return false;
                }
                // remove current
                classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
                // set current
                classie.add(item, 'menu__item--current');
            };
    
        [].slice.call(menuItems).forEach(function(el) {
            el.addEventListener('click', setCurrent);
        });
    });
    // tabs function
    function onTabClick(event){
        let actives = document.querySelectorAll('.active');
    
        for (let i=0; i < actives.length; i++){
            actives[i].className = actives[i].className.replace('active', '');
        }
        event.target.parentElement.className += ' active';
        document.getElementById(event.target.href.split('#')[1]).className += ' active';
    } 
    let el = document.getElementById('nav-tab');
    el.addEventListener('click', onTabClick, false);
    
    })(window);


var movieFinder = (function () {

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
        thePoparea = document.getElementById('pop-area'),
        profilediv = document.getElementById('actors');

    el.addEventListener('click', showMe);

    function movieOverview(data) {

        console.log(data);
        let movieInfo = data.Year + ' . ' + data.Genre.replace(/, /g, "/") + ' . ' + data.Runtime,
            movieText = data.Plot,
            movieReleased = data.Released,
            movieDirector = data.Director,
            movieBoxOffice = data.BoxOffice,
            movieAwards = data.Awards,
            rateBody = '';

        movieTitleSection.innerHTML = `<h1 class="movie-title">${data.Title}</h1>
            <h3 class="movie-info">${movieInfo}</h3>`;
        data.Ratings.forEach(function (rate) {
            if (rate.Source === "Internet Movie Database") rate.Source = "IMDb";
            rateBody += `<a href="#">
            <span class='rating-scroe'>${rate.Value}</span>
            <span class='rating-source'>${rate.Source}</a>`;
        });
        ratingSection.innerHTML = rateBody;

        movietextArea.innerHTML = `<p>${data.Plot}</p>`

        var hideSectiontext = `<div id="released" class="movie-awards movie-releasedate">
                                    <p>Release date: <span>${data.Released}</span></p></div>
                                    <div id="director" class="movie-awards movie-director">            
                                    <p>Director: <span>${data.Director}</span></p></div>
                                    <div class="movie-awards movie-film">
                                    <p>Box office: <span>${data.BoxOffice}</span></p>
                                </div>`;
        hideSection.innerHTML = hideSectiontext;


        moreInfobuuton.classList.toggle('hide-section');

        // //swiper slide
        sliderBox(data.Poster);


        let lightbox = new Lightbox();
        lightbox.load();
        theFindarea.classList.toggle('hide-section');
        theMoviearea.classList.toggle('show-section');
    }

    function movieCast(actors){

        let actorsdata = actors.split(','),
            actorBody = '',
            actor_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemyxECZwq-2HN1V9OJzNRjtRgeaJWUA02KrNqivdf3h-PH1fGyfe0wTKNEGoBlm16auWsTw';


        actorsdata.forEach(function(actor) {

            actorBody +=`<div class="profile-box">
                            <a class="trigger-button" href="#">
                                <div class="pimgwrap">
                                <img class="d7ENZc" data-h="96" data-w="96"  src="${actor_url}" alt="${actor}">
                                </div>
                                <div class="cast-credit"><h2 class="cast-title">${actor}</h2>
                                <h4 class="cast-role">Max Rockatansky</h4></div></a>
                        </div>`;
        });
        profilediv.innerHTML = actorBody;

        
        let btn = document.getElementsByClassName('.trigger-button'),
            popBody = `<div><div class="top-area">
            <div class="swiper-cast"><div class="swiper-wrapper">
            <div class="swiper-slide">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpZMT1IEm2BuoO5cmrLhJOmT113t3O3JLRYDiOdUGQoUMeFmjUDg"></div>
            <div class="swiper-slide">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpZMT1IEm2BuoO5cmrLhJOmT113t3O3JLRYDiOdUGQoUMeFmjUDg"></div>
            <div class="swiper-slide"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfuti39OO-awSl6G6pNKzBFy4Gsx2Kml7eC_E8_89FsFSdUAEzOA"></div>
            <div class="swiper-slide"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfuti39OO-awSl6G6pNKzBFy4Gsx2Kml7eC_E8_89FsFSdUAEzOA"></div>
            </div></div>
            <div class="popcast-titlearea">
            <h3>Tom Hardy<span>Actor</span></h3></div></div>
            <div class="down-area"><div class="hide-box ">
            <div class="movie-text"><p>Edward Thomas Hardy CBE is an English actor and producer. 
            After studying method acting at the Drama Centre London, Hardy made his film debut in 
            Ridley Scott Black Hawk Down and has since appeared in ...</p></div>
            <div class="movie-awards movie-releasedate">
            <p>Born: <span>September 15, 1977 (age 41 years)</span></p></div>
            <div class="movie-awards movie-releasedate"><p>Height: <span>1.75 m</span></p></div>
            <div class="movie-awards movie-releasedate"><p>Residence: <span>Richmond, London</span></p></div><div class="movie-awards movie-releasedate">
            <p>Spouse:  <span>Charlotte Riley</span></p></div><div class="movie-awards movie-releasedate"><p>Children:  <span>Louis Thomas Hardy</span></p></div>
            </div></div></div>`;
            //
        btn.addEventListener('click', actorPopup(popBody));
    }

    function getMovie(movieName, movieYear) {
        url = 'https://www.omdbapi.com/?apikey=c2960c6d&t=' + movieName + '&y=' + movieYear + '';
        fetch(url).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(data => {
            if (data.Response === "False") {
                alert(data.Error);
            } else {
                //console.log(data);
                movieOverview(data);
                movieCast(data.Actors);
            }
        }).catch(err => {
            alert('Opps :/ API error');
        });
    }

    function sliderBox(Poster = '') {

        let mySwiper = new Swiper('.swiper-container', {

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

        if(Poster){
            mySwiper.prependSlide('<div class="swiper-slide"><img src="' + Poster + '" data-jslghtbx></div>');
            mySwiper.slideTo(0, 1000, true);
        }
        mySwiper.init();
    }

    function actorPopup(popBody){

        let downArea = document.querySelector('.hide-box');
        tingle.modal.init();
        tingle.modal.setContent(popBody);
        tingle.modal.open();
        downArea.classList.toggle('up-box');
        sliderBox();

    }

    thesharebtn.onclick = function () {
        thePoparea.classList.toggle('show-section');
    };
    moreInfobuuton.onclick = function () {
        theSection.classList.toggle('show-section');
        moreInfobuuton.classList.toggle('up-arrow');
    };

    function showMe(name, checkyear) {
        getMovie(movieName.value, movieYear.value);
    }
    return {
        showMe: showMe
    }

})();


exports = movieFinder;
exports = coreFunctions;