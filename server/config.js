Meteor.publish('timelineMain', function (route, id) {
	if (route === 'main')
		return Timeline.find({}, {limit: 1, sort: {created: -1}});
	else if (route === 'single')
		return Timeline.find({'tid': id}, {limit: 1});
	else if (route === 'edit')
		return Timeline.find({'tid': id}, {limit: 1});
});

Meteor.publish('timelineCarousel', function (skip) {
	return Timeline.find({}, {limit: 5, skip: skip, sort: {created: -1}});
});