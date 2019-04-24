/* Begin script execution after the web app has loaded completely */
window.onload = function(){
	$('.sidenav').sidenav();
	$('.carousel').carousel({fullWidth: true});
	setInterval(function(){M.Carousel.getInstance(lpcsl).next();}, 3000);
	setTimeout(function(){$('#read_mode').fadeOut();}, 1000);
	document.getElementById('button_continue_reading').onclick = function(){
		$('#display_mode').fadeOut();
		setTimeout(function(){
			$('#read_mode').fadeIn();
			$('html, body').animate({scrollTop: $("#main_content").offset().top}, 300);
		}, 200);
	}
	document.getElementById('button_go_back').onclick = function(){
		$('#read_mode').fadeOut();
		setTimeout(function(){
			$('#display_mode').fadeIn();
			$('html, body').animate({scrollTop: $(".navbar-fixed").offset().top}, 300);
		}, 200);
	}
}
