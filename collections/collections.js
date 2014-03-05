Timeline = new Meteor.Collection('timeline');
if(Meteor.isClient) {
	Meteor.startup(function () {
		LocalTimeline.insert(	{
			title: "",
			milestones: [
				{	
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: "",
					desc: "",
					img: "resim2.jpg",
				},
				{
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: "",
					desc: "",
					img: "resim.jpg",
				},
				{	
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: "",
					desc: "",
					img: "resim2.jpg",
				}
			]
		})
	});
}