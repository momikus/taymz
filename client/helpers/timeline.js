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
		if (Timeline.findOne({'tid': Session.get('singleTimeline')}) !== undefined) {
			
			// get the milestones of the main timeline
			var milestones = Timeline.findOne({'tid': Session.get('singleTimeline')}).milestones;

			// return milestone sorted by year, month, day
			var array = _(_(_(milestones).sortBy(function (milestones) {
				return milestones.day;
			})).sortBy(function (milestones) {
				return milestones.month;
			})).sortBy(function (milestones) {
				return milestones.year;
			});
			return array;
		}
	},
	// kacYilOldu: function () {
	// 	var sonuc = new Date().getFullYear() - this.year;
	// 	if (sonuc > 0)
	// 		return sonuc + " yıl oldu";
	// 	else {
	// 		var currentTime = new Date()
	// 		var ayliSonuc = currentTime.getMonth()+1- this.month;
	// 		if( ayliSonuc > 0)
	// 			return ayliSonuc + " ay oldu"
	// 		else if (ayliSonuc==0)
	// 			return "Bu ay oldu";
	// 		else 
	// 			return "Bu Yıl oldu";			
	// 	}

	// },

});

Template.timeline.created = function () {

	// bunun burda ne işi var bakılacak. başka bi yere mi ait?
	$('p').on('paste', function () {
		$('p').delay(50).queue(function (next) {
			$('p').html($('p').text());
			next();
		});
	});

	//Go to top butonunun ve sosyal butonların çıkıp çıkmaması fonksiyonu
	$(window).scroll(function () {
		if ($(window).scrollTop() > 600) {
			$('.basaDon').fadeIn(300);
			$(".gizliBaslik").fadeIn(300);
		} else {
			$('.basaDon').fadeOut(300);
			$(".gizliBaslik").fadeOut(300);
		}
	});

};

Template.timeline.events({

	// go to top button
	'click .basaDon':function() {
		$('html,body').animate({ scrollTop: 0 }, 'slow');
	}
})