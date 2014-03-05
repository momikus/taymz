Meteor.publish("timeline", function () {
	return Timeline.find();
});