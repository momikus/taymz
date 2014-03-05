Meteor.subscribe('timeline');
Session.set("splitDegree", 0); // Birisi siteyi açtığında carouseli en baştan başlatmak için
LocalTimeline = new Meteor.Collection(null);

