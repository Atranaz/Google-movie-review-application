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
(function() {
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

// api fetch function
(function(){

	let findMovie = document.getElementById('findnow');

	findMovie.onclick = function () {		
		
		let movieName = document.getElementById('movie-title').value,
		movieYear = document.getElementById('movie-year').value,
		url = 'http://www.omdbapi.com/?apikey=c2960c6d&t='+movieName+'&y='+movieYear+'';
		fetch(url).then(response => {
		if (!response.ok) {
		throw Error(response.statusText);
		}
		return response.json();
		}).then(data => {
			if(data.Response === "False"){ alert(data.Error); }
			else {
				movieOverview(data);
				movieCast(data.Actors);
			}
		}).catch(err => {
		alert('Opps :/ API error');
		});

			function movieOverview(data){
				console.log(data.Ratings);
				let movieTitle = data.Title,
					movieInfo = data.Year+' . '+data.Genre.replace(/, /g, "/")+' . '+data.Runtime,
					movieText = data.Plot,
					movieReleased = data.Released,
					movieDirector = data.Director,
					movieBoxOffice = data.BoxOffice
					theFindarea = document.getElementById('find-movie'),
					theMoviearea = document.getElementById('movie-review'),
					movieAwards = data.Awards;
				
				theFindarea.classList.toggle('hide-section');
				theMoviearea.classList.toggle('show-section');

				// assign the response data
				let theMovietitle= document.createElement("h1"),
					theMovieinfo = document.createElement("h3"),
					theMovietext = document.createElement("p"),
					awrad_link = document.createElement("a"),
					textawards = document.createTextNode("Awards: "),
					theAwardtext = document.createElement("p"),
					theReleased = document.createElement("p"),
					textReleased = document.createTextNode("Release date: "),
					theReleasedspan = document.createElement("span"),
					theDirectortext = document.createElement("p"),
					textDirector = document.createTextNode("Director: "),
					theDirectorspan = document.createElement("span"),
					theRatehref = document.createElement("a"),
					clone;


				data.Ratings.forEach(function(rate) {
					if(rate.Source === "Internet Movie Database") rate.Source = "IMDb";
					clone = theRatehref.cloneNode();
					clone.href = "#";
					clone.innerHTML = "<span class='rating-scroe'>"+rate.Value+"</span><span class='rating-source'>"+rate.Source+"";
					document.getElementById('rating').appendChild(clone);
				});
				
				awrad_link.href = "#";
				awrad_link.innerHTML = movieAwards;
				theReleasedspan.innerHTML = movieReleased;
				theDirectorspan.innerHTML = movieDirector;		 

			    theMovietitle.appendChild(document.createTextNode(movieTitle));
			    theMovietitle.classList.add("movie-title");
			    theMovieinfo.appendChild(document.createTextNode(movieInfo));
			    theMovieinfo.classList.add("movie-info");
			    theMovietext.appendChild(document.createTextNode(movieText));
			    theReleased.appendChild(textReleased);
				theReleased.appendChild(theReleasedspan);
				theDirectortext.appendChild(textDirector);
				theDirectortext.appendChild(theDirectorspan);


			    document.getElementById('movie-title-section').innerHTML = "";
			    document.getElementById('movie-title-section').appendChild(theMovietitle);
			    document.getElementById('movie-title-section').appendChild(theMovieinfo);
			    document.getElementById('movie-textarea').appendChild(theMovietext);
			    document.getElementById('awards').appendChild(theAwardtext);
			    document.getElementById('released').appendChild(theReleased);
			    document.getElementById('director').appendChild(theDirectortext);

			    //swiper slide
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
			}

			function movieCast(data){
				//
			    let actorsdata = data.split(','),
			    	actor_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemyxECZwq-2HN1V9OJzNRjtRgeaJWUA02KrNqivdf3h-PH1fGyfe0wTKNEGoBlm16auWsTw',
			    	profilediv = document.createElement("div"),
			    	actor_clone;
			    console.log(actorsdata);
			    profilediv.classList.add("profile-box");

			    actorsdata.forEach(function(actor) {
					actor_clone = profilediv.cloneNode();
					actor_clone.innerHTML = '<a class="trigger-button" href="#"><div class="pimgwrap"><img class="d7ENZc" data-h="96" data-w="96"  src="'+actor_url+'" alt="'+actor+'"></div><div class="cast-credit"><h2 class="cast-title">'+actor+'</h2><h4 class="cast-role">Max Rockatansky</h4></div></a>';
					document.getElementById('actors').appendChild(actor_clone);
				});

				tingle.modal.init();
				let btn = document.querySelector('.trigger-button');
				btn.addEventListener('click', function(){
				  tingle.modal.setContent(document.querySelector('.tingle-demo').innerHTML);
				  tingle.modal.open();
				});

			}
	};
	
	// show more & share toggle function
	let theButton = document.getElementById('moremovie-button'),
		theSection = document.getElementById('hide-sections'),
		thesharebtn = document.getElementById('movie-share'),
		thePoparea = document.getElementById('pop-area'),
		theArrow = document.getElementById('moremovie-button');

	thesharebtn.onclick = function(){
		thePoparea.classList.toggle('show-section');
	};
	theButton.onclick = function () {
		theSection.classList.toggle('show-section');
		theArrow.classList.toggle('up-arsrow');
	};

})();