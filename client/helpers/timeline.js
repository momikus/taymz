Handlebars.registerHelper('ayIsmi', function (month) {
	if (month == 1)
		return "Ocak";
	else if (month == 2)
		return "Şubat";
	else if (month == 3)
		return "Mart";
	else if (month == 4)
		return "Nisan";
	else if (month == 5)
		return "Mayıs";
	else if (month == 6)
		return "Haziran";
	else if (month == 7)
		return "Temmuz";
	else if (month == 8)
		return "Ağustos";
	else if (month == 9)
		return "Eylül";
	else if (month == 10)
		return "Ekim";
	else if (month == 11)
		return "Kasım";
	else if (month == 12)
		return "Aralık";
});

Template.timeline.helpers({
	milestones: function () {

		// get the milestones of the main timeline
		var milestones = Timeline.findOne({'tid': Session.get('singleTimeline')}).milestones;

		// return milestone sorted by year, month, day
		return _(_(_(milestones).sortBy(function (milestones) {
			return milestones.day;
		})).sortBy(function (milestones) {
			return milestones.month;
		})).sortBy(function (milestones) {
			return milestones.year;
		});
	}
});

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

	//Go to top butonunun çıkıp çıkmaması fonksiyonu
	$( window ).scroll(function() {
		if ($(window).scrollTop() > 1600) {
			$('.basaDon').fadeIn(300);
		}
		else {
			$('.basaDon').fadeOut(300);
		}
	});

	// meta descripton ve title basıyoruz
	if(Timeline.findOne({'tid': Session.get('singleTimeline')}) !== undefined  ) {
		if (Router.current().route.name === "timeline") {
			var pageSeo = Timeline.findOne({'tid': Session.get('singleTimeline')});
			document.title = 'taymz - ' + pageSeo.title;
			$('head').append( '<meta name="description" content="'+ pageSeo.milestones[0].tagline +' ve ardından '+ pageSeo.milestones.length+' olay daha oldu... Kronolojik ve resimli olarak taymz\'da">' );
		}
		else if (Router.current().route.name === "home") {
			document.title = 'taymz - ' + 'zamanı geldi';
			$('head').append( '<meta name="description" content="Tarihi hiç bu kadar kronolojik görmemiştiniz.">' );
		}
	}

};

Template.timeline.events({
	'click .basaDon':function() {
		$('html,body').animate({ scrollTop: 0 }, 'slow');
	}
})