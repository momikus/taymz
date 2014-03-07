Timeline = new Meteor.Collection('timeline');
if (Meteor.isClient) {
	Meteor.startup(function () {
		LocalTimeline.insert({
			title: '',
			milestones: [
				{
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: '',
					desc: '',
					img: '' 
				},
				{
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: '',
					desc: '',
					img: '' 
				},
				{	
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: '',
					desc: '',
					img: '' 
				}
			]
		});
		return Meteor.methods({
			  // remove local collection
		      removeLocalTimeline: function() {
		        return LocalTimeline.remove({});
		      }
		})
	});
}