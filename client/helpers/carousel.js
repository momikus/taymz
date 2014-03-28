Template.carousel.helpers({

	// indicates if a taym is a draft
	draft: function () {
		if (Timeline.findOne({_id: this._id}) !== undefined) {
			if (Timeline.findOne({_id: this._id}).status === 'draft')
				return 'draft';
		}
	},

	carouselLoaded: function () {
		return Session.get('carouselLoaded');
	}
});