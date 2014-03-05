Template.gezCizgi.events({
	// Carouseli kaydırma olayları ileri&geri
	'click i': function (event) {
		var x = $(event.currentTarget);
		if (x.hasClass('fa-chevron-circle-right')) { // right
			Session.set('skip', (Session.get('skip') + 4));
		} else if (x.hasClass('fa-chevron-circle-left')) { // left
			Session.set('skip', Session.get('skip') - 4);
		}
		Session.set('timelineCarouselLoaded', false);
	}
});

Template.gezCizgi.helpers({

	// get the image of first milestone
	// to show as main img of timeline
	img: function () {
		if (Timeline.findOne({_id: this._id}) !== undefined)
			return Timeline.findOne({'_id': this._id}).milestones[0].img;
	},

	// give class to hide left arrow 
	// if on first page
	leftHide: function () {
		if (Session.equals('skip', 0))
			return 'hide';
	},

	// give class to hide right arrow 
	// if on last page
	rightHide: function () {
		if (Session.get('skip') + 4 > Session.get('totalTimelineCount'))
			return 'hide';
	},

	// handler to display a loading spinner
	timelineCarouselLoaded: function () {
		return Session.get('timelineCarouselLoaded');
	}
});

Template.gezCizgi.rendered = function () {
	Meteor.call('totalTimelineCount', function (err, result) {
		Session.set('totalTimelineCount', result);
	});
};


