Router.configure({
	layoutTemplate: 'layout'
});

// route definitions
Router.map(function () {

	// home route
	this.route('home', {
		path: '/',
		template: 'timeline',
		layoutTemplate: 'home',
		yieldTemplates: {
			'header': {to: 'header'},
			'gezCizgi': {to: 'gezCizgi'}
		},
		waitOn: function () {
			Deps.autorun(function () {
        Meteor.subscribe('timelineMain', 'main');
      });
     
      Deps.autorun(function () {
        var skip = Session.get('skip');
        Meteor.subscribe('timelineCarousel', skip, function () {
					Meteor.setTimeout(function () {
						Session.set('timelineCarouselLoaded', true);
					}, 500);
        });
      });
		},
		data: {
			// skip last timeline in carousel
			timelineCarousel: function () {
				if (!Session.equals('skip', 0))
					return Timeline.find({}, {skip: 1, limit: 4, sort: {created: -1}});
				else
					return Timeline.find({}, {limit: 4, sort: {created: -1}});
			},

			// get the last timeline as main 
			timelineMain: function () {
				return Timeline.find({}, {limit: 1, sort: {created: -1}});
			}
		}
	});

	this.route('add', {
		path: '/cizgi-olustur',
		template: 'entryInput',
		layoutTemplate: 'add',
		yieldTemplates: {
			'header': {to: 'header'},
			'entryCall': {to: 'entryCall'}
		}
	});

	this.route('timeline', {
		path: '/t/:_id',
		layoutTemplate: 'singleTimeline',
		template: 'timeline',
		yieldTemplates: {
			'header': {to: 'header'},
			'gezCizgi': {to: 'gezCizgi'},
		},
		before: function () {
			Session.set('singleTimeline', parseFloat(this.params._id));
		},
		waitOn: function () {
			Deps.autorun(function () {
				var id = Session.get('singleTimeline');
        Meteor.subscribe('timelineMain', 'single', id);
      });

      Deps.autorun(function () {
        var skip = Session.get('skip');
        Meteor.subscribe('timelineCarousel', skip, function () {
					Meteor.setTimeout(function () {
						Session.set('timelineCarouselLoaded', true);
					}, 500);
        });
      });
		},
		data: {
			// skip last timeline in carousel
			timelineCarousel: function () {
				return Timeline.find({
					'tid': {$ne: Session.get('singleTimeline')}
				}, {limit: 4, sort: {created: -1}});
			},

			// set the main timeline according to url 
			timelineMain: function () {
				return Timeline.find({'tid': Session.get('singleTimeline')});
			}
		}
	});
});