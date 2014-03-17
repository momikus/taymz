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
	},
	mainimg: function () {

		if (Timeline.findOne({_id: this._id}) !== undefined) {
			var milestones = Timeline.findOne({tid: Session.get('singleTimeline')}).milestones;

			// main image is not set so take the first img
			if (_.findWhere(milestones, {'mainimg': true}) === undefined)
				return _(_(_(milestones).sortBy(function (milestones) {
					return milestones.day;
				})).sortBy(function (milestones) {
					return milestones.month;
				})).sortBy(function (milestones) {
					return milestones.year;
				})[0].img;

			// main image is set so take that
			else
				return _.findWhere(milestones, {'mainimg': true}).img;
		}
	},
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
			// $('.gizliBaslik').
		}
		else {
			$('.basaDon').fadeOut(300);
		}
	});

	// meta descripton ve title basıyoruz
	if(Timeline.findOne({'tid': Session.get('singleTimeline')}) !== undefined  ) {
		var relatedTimeline = Timeline.findOne({'tid': Session.get('singleTimeline')});
		var ogTitle = relatedTimeline.title;
		console.log(ogTitle);
		var ogUrl = "http://taymz.com/t/"+relatedTimeline.tid;
		var ogSiteName = "taymz";
		var ogDescription = relatedTimeline.milestones[0].tagline + "ve ardından" + relatedTimeline.length-1 + " olay daha oldu. Kronolojik ve resimli olarak taymz\'da";
		var ogImage = "http://s3-eu-west-1.amazonaws.com/taymz/"+relatedTimeline.milestones[0].img;
		$('head').append( '<meta property="og:title" content="'+ogTitle+'">' ).append( '<meta property="og:image" content="'+ogImage+'">' );
		$('head').append( '<meta property="og:url" content="'+ogUrl+'">' );
		$('head').append( '<meta property="og:site_name" content="'+ogSiteName+'">' );
		$('head').append( '<meta property="og:description" content="'+ogDescription+'">' );

		if (Router.current().route.name === "timeline") {
			var pageSeo = Timeline.findOne({'tid': Session.get('singleTimeline')});
			document.title = 'taymz - ' + pageSeo.title;
			$('head').append( '<meta name="description" content="'+ pageSeo.milestones[0].tagline +' ve ard65565ından '+ pageSeo.milestones.length+' olay daha oldu. Kronolojik ve resimli olarak taymz\'da">' );
		}
		else if (Router.current().route.name === "home") {
			document.title = 'taymz - ' + 'zamanı geldi';
			$('head').append( '<meta name="description" content="Tarihi hiç bu kadar kronolojik görmemiştiniz.">' );
		}
			
// <meta property="og:title" content="The Rock"/>

// <meta property="og:url" content="http://www.imdb.com/title/tt0117500/"/>
// <meta property="og:image" content="http://ia.media-imdb.com/rock.jpg"/>
// <meta property="og:site_name" content="IMDb"/>

// <meta property="og:description"
//       content="A group of U.S. Marines, under command of
//                a renegade general, take over Alcatraz and
//                threaten San Francisco Bay with biological
//                weapons."/>




	}

	//kullanıcılar link verdiğinde nofollow ve target blank yapmaca
	$('.olay a').attr('target', '_blank').attr('rel', 'nofollow');

};

Template.timeline.events({
	'click .basaDon':function() {
		$('html,body').animate({ scrollTop: 0 }, 'slow');
	}
})