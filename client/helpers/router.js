Router.configure({
	layoutTemplate: 'layout'
});

var requireAdmin = function () {
	if (!Session.equals('varoAdmin', true)) {
		Router.go('home');
		this.stop();
	}
};

Router.before(requireAdmin,
  {except: ['home', 'timeline', 'edit']
});

// route definitions
Router.map(function () {

	// home route
	this.route('home', {
		path: '/',
		template: 'gallery',
		layoutTemplate: 'home',
		yieldTemplates: {
			'header': {to: 'header'}
		},
		before: function() {
			document.title = 'taymz - zamanı geldi';
			$('head').append( '<meta name="description" content="Tarihi hiç bu kadar kronolojik görmemiştiniz.">' );
			$('body').append("<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>");
		
		},
		
		waitOn: function () {	
			var admin;
			if (Session.equals('varoAdmin', true))
				admin = true;
			else
				admin = false;
			Meteor.subscribe('timelineAll', admin);
		},

		after: function () {
			Session.set('singleTimeline', null);
		},

		data: {
			timelineAll: function () {
				return Timeline.find({}, {limit: 50, sort: {created: -1}});
			},
		},
	});

	// home route
	this.route('static', {
		path: '/nedir',
		template: 'static',
		layoutTemplate: 'home',
		yieldTemplates: {
			'header': {to: 'header'}
		},
	});

	// create new taym
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

	// edit current taym
	this.route('edit', {
		path: '/taym-duzenle',
		template: 'entryInput',
		layoutTemplate: 'add-edit',
		yieldTemplates: {
			'header': {to: 'header'},
			'entryCall': {to: 'entryCall'}
		},
		waitOn: function () {
			var tid = Session.get('singleTimeline');
			Meteor.subscribe('timelineMain', 'single', tid, admin);
		},
		before: function () {
			Meteor.call('removeLocalTimeline');
			if (Timeline.findOne() !== undefined) {
				var tid = Session.get('singleTimeline');
				var title = Timeline.findOne({tid: tid}).title;
				var milestones = Timeline.findOne({tid: tid}).milestones;
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
			'header': {to: 'header'}
		},
		before: function () {
			Session.set('singleTimeline', parseFloat(this.params._id));
		},

		waitOn: function () {
			var id = Session.get('singleTimeline');
			if (Session.equals('varoAdmin', true))
				admin = true;
			else
				admin = false;
			Meteor.subscribe('timelineMain', 'single', id, admin);
		},
		after: function () {

			//*****************************// 
      // **** Google Analytics  **** //
      //*****************************// 
      window._gaq = window._gaq || [];
      _gaq.push(['_setAccount', 'UA-48882288-1']);
      _gaq.push(['_setDomainName', 'taymz.com']);
      _gaq.push(['_trackPageview']);
		},

		data: {

			// set the main timeline according to url 
			timelineMain: function () {
				return Timeline.findOne({'tid': Session.get('singleTimeline')});
			},

		}
	});
});