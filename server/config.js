Meteor.publish('timelineMain', function (route, id, admin) {
	if (route === 'main')
		return Timeline.find({'status': 'published'},
			{limit: 1, sort: {created: -1}});
	else if (route === 'single') {
		if (admin === true)
			return Timeline.find({'tid': id}, {limit: 1});
		else
			return Timeline.find({'tid': id, 'status': 'published'}, {limit: 1});
	}
});

Meteor.publish('timelineAll', function (admin, limit) {
	if (admin === true)
		return Timeline.find({}, {
			limit: limit,
			sort: {created: -1},
			fields: {milestones: 0}
		});
	else
		return Timeline.find({'status': 'published'}, {
			limit: limit,
			sort: {created: -1},
			fields: {status: 0, updated: 0, milestones: 0}
		});
});

Meteor.publish('timelineCarousel', function () {
	var skip = Math.ceil(Random.fraction() * (Timeline.find({'status': 'published'}).count() - 10));
	return Timeline.find({'status': 'published'}, {
		limit: 10,
		sort: {created: -1},
		skip: skip,
		fields: {status: 0, updated: 0}
	});
});