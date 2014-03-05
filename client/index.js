if (Meteor.isClient) {
	Meteor.subscribe('timeline');
	Session.set("splitDegree", 0); // Birisi siteyi açtığında carouseli en baştan başlatmak için
 // Handlebars.registerHelper('_id', function () {
 //      return this._id._str;
 //  });
}
