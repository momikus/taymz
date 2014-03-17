Template.gezCizgi.events({
	// Carouseli kaydırma olayları ileri&geri
	'click i': function (event) {
		var x = $(event.currentTarget);
		if (x.hasClass('fa-chevron-right')) { // right
			Session.set('skip', (Session.get('skip') + 4));
		} else if (x.hasClass('fa-chevron-left')) { // left
			Session.set('skip', Session.get('skip') - 4);
		}
		Session.set('timelineCarouselLoaded', false);
	}
});

Template.gezCizgi.helpers({

	// set the image to be displayed in carousel
	img: function () {

		if (Timeline.findOne({_id: this._id}) !== undefined) {
			var milestones = Timeline.findOne({_id: this._id}).milestones;

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

	// give class to hide left arrow 
	// if on first page
	leftHide: function () {
		if (Session.equals('skip', 0))
			return 'hidden';
		else
			return 'visible';
	},

	// give class to hide right arrow 
	// if on last page
	rightHide: function () {
		if (Session.get('skip') + 4 > Session.get('totalTimelineCount'))
			return 'hidden';
		else
			return 'visible';
	},

	// handler to display a loading spinner
	timelineCarouselLoaded: function () {
		return Session.get('timelineCarouselLoaded');
	},

	//olay count alıyp carouselde göstermek
	olayCount: function() {
		if (Timeline.findOne({_id: this._id}) !== undefined) {
			var milestones = Timeline.findOne({_id: this._id}).milestones;
			return milestones.length; 
		}
	}
});

Template.gezCizgi.rendered = function () {

	// get total timeline count for pagination
	Meteor.call('totalTimelineCount', function (err, result) {
		Session.set('totalTimelineCount', result);
	});

	$('.carousel a').hide();
	$('.carousel a').each(function (i) {
		$(this).delay(i * 100).fadeIn(200);
	});
};