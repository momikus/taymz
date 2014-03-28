Meteor.methods({

  // returns total timeline count
  // for pagination limits
  totalTimelineCount: function (admin) {
    if (admin === true)
      return Timeline.find({}).count();
    else
      return Timeline.find({'status': 'published'}).count();
  },

  // inserts new timeline to the db
  timelineInsert: function (title, milestones, mainimg, draftOrPublish) {

    // get latest tid
    var tid = Timeline.findOne({}, {limit: 1, sort: {created: -1}}).tid;

    // parse to int and add one
    tid = parseInt(tid) + 1;

    // insert into db
    Timeline.insert({
      tid: tid,
      title: title,
      mainimg: mainimg,
      created: new Date(),
      milestones: milestones,
      status: draftOrPublish
    }, function (err, result) {
      if (err)
        console.log('An error has occured: ' + err);
      else
        console.log('New timeline inserted with id of: ' + result);
    });
  },

  // update taym
  timelineUpdate: function (tid, title, milestones, mainimg, draftOrPublish) {
    Timeline.update({tid: tid}, {
      $set: {
        title: title,
        milestones: milestones,
        mainimg: mainimg,
        status: draftOrPublish,
        updated: new Date(),
      }
    }, function (err, result) {
      if (err)
        console.log('An error has occured: ' + err);
      else
        console.log('New timeline inserted with id of: ' + result);
    });
  }
});