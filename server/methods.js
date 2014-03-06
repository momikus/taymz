Meteor.methods({

  // returns total timeline count
  // for pagination limits
  totalTimelineCount: function () {
    return Timeline.find({}).count();
  },

  // inserts new timeline to the db
  timelineInsert: function (title, milestones) {

    // get latest tid
    var tid = Timeline.findOne({}, {limit: 1, sort: {created: -1}}).tid;

    // parset to int and add one
    tid = parseInt(tid) + 1;

    // insert into db
    Timeline.insert({
      tid: tid,
      title: title,
      created: new Date(),
      milestones: milestones
    }, function (err, result) {
      if (err)
        console.log('An error has occured: ' + err);
      else
        console.log('New timeline inserted with id of: ' + result);
    });
  }
});