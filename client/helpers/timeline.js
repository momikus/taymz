Template.timeline.rendered = function () {
	$('p').on('paste', function () {
		$('p').delay(50).queue(function (next) {
			$('p').html($('p').text());
			next();
		});
	});

	// lazy load images
	// with fadeIn effect
	$('img.lazy').lazyload({
		effect : 'fadeIn'
	});
};