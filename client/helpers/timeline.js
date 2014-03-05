Template.timeline.rendered = function () {
	$('p').on('paste', function () {
		$('p').delay(50).queue(function (next) {
			$('p').html($('p').text());
			next();
		});
	});

	// lazy load images
	// with fadeIn effect
	$('img.lazy').lazyload({
		effect : 'fadeIn'
	});
};

Template.timeline.helpers({
	timeline: function () {
		if (Router.current().route.name === 'home')
			return Timeline.findOne({}, {sort: {created: -1}});
		else if (Router.current().route.name === 'timeline') {
      var id = parseFloat(Session.get('singleTimeline'));
			return Timeline.findOne({tid: id});
		}
	},
	mudurOn: function () {
		if (Session.equals('mudurMod', true))
			return true;
	}
});