var requireAdmin = function () {
	if (!Session.equals('varoAdmin', true)) {
		Router.go('home');
		this.stop();
	}
};

Router.onBeforeAction(requireAdmin,
  {except: ['home', 'timeline', 'edit', 'nedir']
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
		onBeforeAction: function() {
			// for seo
			document.title = 'taymz - zamanı geldi';
			$('head').append( '<meta name="description" content="Tarihi hiç bu kadar kronolojik görmemiştiniz.">' );

			// get total count for infinite loading
			var admin;
			if (Session.equals('varoAdmin', true))
				admin = true;
			else
				admin = false;
			Meteor.call('totalTimelineCount', admin, function (err, result) {
				Session.set('totalTimelineCount', result);
			});
		},
		
		waitOn: function () {	
			var limit = Session.get('timelineLimit');
			var admin;
			if (Session.equals('varoAdmin', true))
				admin = true;
			else
				admin = false;
			Meteor.subscribe('timelineAll', admin, limit, function () {
				Session.set('galleryLoaded', true);
				// Meteor.setTimeout(function(){
				// 	$('ul.gallery li').each(function(){
				// 		$(this).find('img').load(function(){
				// 			var resim = $(this).attr('src');
				// 			$(this).parent().css('background-image', "url("+resim+")");	
				// 		})
				// 	});		
				// },500)
			});
		},

		onAfterAction: function () {
			Session.set('singleTimeline', null);
			Session.set('galleryLoaded', false);
			Session.set('carouselLoaded', false);
			Session.set('timelineLimit', 12);
		},

		data: {
			timelineAll: function () {
				return Timeline.find({}, {limit: 100, sort: {created: -1}});
			},
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
		onBeforeAction: function () {
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
			var admin;
			if (Session.equals('varoAdmin', true))
				admin = true;
			else
				admin = false;
			var tid = Session.get('singleTimeline');
			Meteor.subscribe('timelineMain', 'single', tid, admin);
		},
		onBeforeAction: function () {
			Meteor.call('removeLocalTimeline');
			if (Timeline.findOne() !== undefined) {
				var tid 		= Session.get('singleTimeline');
				var title 		= Timeline.findOne({tid: tid}).title;
				var milestones 	= Timeline.findOne({tid: tid}).milestones;
				var mainimg		= Timeline.findOne({tid: tid}).mainimg;
				LocalTimeline.insert({
					tid: tid,
					title: title,
					milestones: milestones,
					mainimg: mainimg
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
			'carousel': {to: 'carousel'}
		},
		onBeforeAction: function () {
			Session.set('singleTimeline', parseFloat(this.params._id));
		},

		waitOn: function () {
			var id = Session.get('singleTimeline');
			if (Session.equals('varoAdmin', true))
				admin = true;
			else
				admin = false;
			Meteor.subscribe('timelineMain', 'single', id, admin, function () {
			});

			// carousel öğelerinin subscribeı için
			var admin;
			if (Session.equals('varoAdmin', true))
				admin = true;
			else
				admin = false;
			Meteor.subscribe('timelineCarousel', function () {
				Session.set('carouselLoaded', true);
			});
		},
		onAfterAction: function () {

			if (Timeline.findOne({'tid': Session.get('singleTimeline')}) !== undefined  ) {
				// Facebook open graph propertyleri burada yükleniyor. template rendered da olmuyor.
				var relatedTimeline = Timeline.findOne({'tid': Session.get('singleTimeline')});
				var ogTitle = relatedTimeline.title;
				var ogUrl = "http://taymz.com/t/" + relatedTimeline.tid;
				var ogSiteName = "taymz";
				//var ogDescription = relatedTimeline.milestones[0].tagline + " ve ardından " + relatedTimeline.milestones.length + " olay daha oldu. Kronolojik ve resimli olarak taymz\'da";
				var ogDescription = "Kronolojik sırayla ve resimli olarak taymz\'da";
				var ogImage = "http://s3-eu-west-1.amazonaws.com/taymz/"+relatedTimeline.mainimg;
				$('head').append('<meta property="og:title" content="'+ ogTitle +'">');
				$('head').append('<meta property="og:image" content="'+ ogImage +'">');
				$('head').append('<meta property="og:url" content="'+ogUrl+'">');
				$('head').append('<meta property="og:description" content="'+ ogDescription +'">');
				//Seosal hareketler
				$('meta[name=description]').attr('content', ogDescription);
				$('title').text('taymz - ' + ogTitle);
			}

				Meteor.setTimeout(function () {
					$('img.lazy').lazyload({
						effect : 'fadeIn',
						threshold: 800
					});
				}, 40);

			//kullanıcılar link verdiğinde nofollow ve target blank yapmaca
			Meteor.setTimeout(function(){
				$('.textContainer p a').attr('target', '_blank');
				$('.textContainer p a').attr('rel', 'nofollow');
			})

			// Sayfa yukarıdan açılsın
			$('body').scrollTop(0);
			$('html').scrollTop(0);

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
			timelineAll: function () {
				return Timeline.find({'tid':{$ne:Session.get('singleTimeline')}}, 
					{limit: 10, sort: {created: -1}});
			}
		}
	});

	//nedir route
	this.route('nedir', {
		path: '/nedir',
		template: 'nedir',
		layoutTemplate: 'static',
		yieldTemplates: {
			'header': {to: 'header'}
		}
	});

});