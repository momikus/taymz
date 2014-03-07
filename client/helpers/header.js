Template.header.helpers({
	varoAdmin: function () {
		if (Session.equals('varoAdmin', true))
			return true;
	}
});
Template.header.events({
	'click .add':function() {
		// LocalTimeline.remove();
		// LocalTimeline.insert({
		// 	title: '',
		// 	milestones: [
		// 		{
		// 			_id: new Meteor.Collection.ObjectID()._str,
		// 			tagline: 'Deneme',
		// 			desc: '',
		// 			img: '' 
		// 		},
		// 		{
		// 			_id: new Meteor.Collection.ObjectID()._str,
		// 			tagline: '',
		// 			desc: '',
		// 			img: '' 
		// 		},
		// 		{	
		// 			_id: new Meteor.Collection.ObjectID()._str,
		// 			tagline: '',
		// 			desc: '',
		// 			img: '' 
		// 		}
		// 	]
		// });
		// alert("evet");
	}

})