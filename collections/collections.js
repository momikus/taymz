Timeline = new Meteor.Collection('timeline');
if(Meteor.isClient) {
	Meteor.startup(function () {
		LocalTimeline.insert(	{
			title: "",
			milestone: [
				{	
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: "",
					desc: "",
					img: "",
				},
				{
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: "",
					desc: "",
					img: "",
				},
				{	
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: "",
					desc: "",
					img: "",
				}
			]
		})
	});
}