Meteor.methods({
  totalTimelineCount: function() {
    return Timeline.find({}).count();
  }
});