Router.configure({
	layoutTemplate: 'layout'
});
Router.map(function () {
	this.route('home', {
		path: '/',
		template: 'timeline',
		layoutTemplate: 'home',
		yieldTemplates: {
			'header': {to: 'header'},
			'gezCizgi': {to: 'gezCizgi'}
		}
	});
	this.route('add', {
		path: '/cizgi-olustur',
		template: 'entryInput',
		layoutTemplate: 'add',
		yieldTemplates: {
			'header': {to: 'header'},
			'entryCall': {to: 'entryCall'}
		}
	});
	this.route('timeline', {
		path: '/t/:_id',
		layoutTemplate: 'singleTimeline',
		template: 'timeline',
		yieldTemplates: {
			'header': {to: 'header'},
			'gezCizgi': {to: 'gezCizgi'},
		},
		before: function () {
			Session.set('singleTimeline', this.params._id);
		},
		// waitOn: function () {
		//   	Deps.autorun(function(){ 
		// 		var queryfinder = function(){  
		// 		  return {'_id': Session.get('singleTimeline')};
		// 		}
		// 		var query = queryfinder();
		// 		Meteor.subscribe('timeline', query);
	//    	});
		// }
	});
});