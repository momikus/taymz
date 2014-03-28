Template.gallery.helpers({

	// indicates if a taym is a draft
	draft: function () {
		if (Timeline.findOne({_id: this._id}) !== undefined) {
			if (Timeline.findOne({_id: this._id}).status === 'draft')
				return 'draft';
		}
	},

	galleryLoaded: function () {
		return Session.get('galleryLoaded');
	},

	allTimelinesLoaded: function () {
		if (Timeline.find().count() === Session.get('totalTimelineCount'))
			return true;
	}
});
