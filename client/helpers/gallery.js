Template.gallery.helpers({

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

	// olay count alıp galeride göstermek
	olayCount: function () {
		if (Timeline.findOne({_id: this._id}) !== undefined) {
			var milestones = Timeline.findOne({_id: this._id}).milestones;
			return milestones.length; 
		}
	},

	// indicates if a taym is a draft
	draft: function () {
		if (Timeline.findOne({_id: this._id}) !== undefined) {
			if (Timeline.findOne({_id: this._id}).status === 'draft')
				return 'draft';
		}
	}

});

Template.gallery.rendered = function () {
	//Bu kod galeride tüm resimler yüklendikten sonra tüm resimlerin aynı anda
	// gmrünüyor olmasını sağlıyordu ama efektif olmadığı için commentout şimdilik
	// $(window).load(function() {
	// 	$('.imageContainer').css('visibility','visible');
	// });
}