Template.header.events({
	'click .mudur': function (event) {
		var x = $(event.currentTarget);
		if (x.hasClass('active')) {
			x.removeClass('active');
			x.removeClass('active2');
			x.addClass('active3');
			Session.set('mudurMod', false);
		} else {
			x.addClass('active');
			Session.set('mudurMod', true);
		}
	},
	'mouseleave .mudur': function (event) {
		var x = $(event.currentTarget);
		if (x.hasClass('active'))
			x.addClass('active2');
		else
			x.removeClass('active3');
	}
});