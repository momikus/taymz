Router.configure({
	layoutTemplate: 'layout'
});

var requireAdmin = function() {  
 if (!Session.equals('varoAdmin', true)) {   
   Router.go('home');
     this.stop();  
   }
};

Router.before(requireAdmin, 
  {except: ['home', 'timeline']
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
				return Timeline.findOne({}, {limit: 1, sort: {created: -1}});
			}
		},
	});

	this.route('add', {
		path: '/taym-olustur',
		template: 'entryInput',
		layoutTemplate: 'add-edit',
		yieldTemplates: {
			'header': {to: 'header'},
			'entryCall': {to: 'entryCall'}
		},
		before: function () {
			Meteor.call('removeLocalTimeline');
			LocalTimeline.insert({
				title: '',
				milestones: [
					{
						_id: new Meteor.Collection.ObjectID()._str,
						tagline: '',
						desc: '',
						img: '' 
					},
					{
						_id: new Meteor.Collection.ObjectID()._str,
						tagline: '',
						desc: '',
						img: '' 
					},
					{	
						_id: new Meteor.Collection.ObjectID()._str,
						tagline: '',
						desc: '',
						img: '' 
					}
				]
			});
		}
	});

	this.route('edit', {
		path: '/taym-duzenle',
		template: 'entryInput',
		layoutTemplate: 'add-edit',
		yieldTemplates: {
			'header': {to: 'header'},
			'entryCall': {to: 'entryCall'}
		},
		waitOn: function () {
			Deps.autorun(function () {
				var tid = Session.get('singleTimeline');
				Meteor.subscribe('timelineMain', 'single', tid);
			});
		},
		before: function () {
			Meteor.call('removeLocalTimeline');
			if (Timeline.findOne() !== undefined) {
				var tid = Session.get('singleTimeline');
				var title = Timeline.findOne({tid:tid}).title;
				var milestones = Timeline.findOne({tid:tid}).milestones;
				LocalTimeline.insert({
					tid: tid,
					title: title,
					milestones: milestones
				});
			}
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
				return Timeline.findOne({'tid': Session.get('singleTimeline')});
			},
			
		}
	});
});