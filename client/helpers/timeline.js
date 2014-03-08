Handlebars.registerHelper('ayIsmi', function(month) {
	if (month == 1)
		var result = "Ocak";
	else if (month == 2)
		var	result = "Şubat";
	else if (month == 3)
		var result = "Mart";
	else if (month == 4)
		var result = "Nisan";
	else if (month == 5)
		var result = "Mayıs";
	else if (month == 6)
		var result = "Haziran";
	else if (month == 7)
		var result = "Temmuz";
	else if (month == 8)
		var result = "Ağustos";
	else if (month == 9)
		var result = "Eylül";
	else if (month == 10)
		var result = "Ekim";
	else if (month == 11)
		var result = "Kasım";
	else if (month == 12)
		var result = "Aralık";
	return result;
});
   
Template.timeline.rendered = function () {
	$('p').on('paste', function () {
		$('p').delay(50).queue(function (next) {
			$('p').html($('p').text());
			next();
		});
	});

	if (Router.current().route.name == 'home') {
		if (Timeline.findOne({}, {limit: 1, sort: {created: -1}}) != undefined) {
			var tid = Timeline.findOne({}, {limit: 1, sort: {created: -1}}).tid;
			Session.set('singleTimeline', tid);
		}
	}
	// lazy load images
	// with fadeIn effect
	$('img.lazy').lazyload({
		effect : 'fadeIn'
	});
};