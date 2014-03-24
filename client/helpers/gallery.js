Template.gallery.helpers({

	// set the image to be displayed in carousel
	img: function () {
		
			if (Timeline.findOne({_id: this._id}) !== undefined) {
				var milestones = Timeline.findOne({_id: this._id}).milestones;
	
				// main image is not set so take the first img
				if (_.findWhere(milestones, {'mainimg': true}) === undefined)
					return _(_(_(milestones).sortBy(function (milestones) {
						return milestones.day;
					})).sortBy(function (milestones) {
						return milestones.month;
					})).sortBy(function (milestones) {
						return milestones.year;
					})[0].img;
	
				// main image is set so take that
				else
					return _.findWhere(milestones, {'mainimg': true}).img;
			}
		
	},

	// olay count alıp galeride göstermek
	olayCount: function () {
		if (Timeline.findOne({_id: this._id}) !== undefined) {
			var milestones = Timeline.findOne({_id: this._id}).milestones;
			return milestones.length; 
		}
	},

	// indicates if a taym is a draft
	draft: function () {
		if (Timeline.findOne({_id: this._id}) !== undefined) {
			if (Timeline.findOne({_id: this._id}).status === 'draft')
				return 'draft';
		}
	}
});

Template.gallery.rendered = function () {
$(window).load(function() {
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
});



	//Bu kod galeride tüm resimler yüklendikten sonra tüm resimlerin aynı anda
	// gmrünüyor olmasını sağlıyordu ama efektif olmadığı için commentout şimdilik
	// $(window).load(function() {
	// 	$('.imageContainer').css('visibility','visible');

	// });
	//var twitterStr = "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"
	//$('head').append("<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>");
//$('head').append("");

    // window.___gcfg = {lang: 'tr'};
    //   (function() {
    //   var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    //   po.src = 'https://apis.google.com/js/platform.js';
    //   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    // })();

	// (function(d, s, id) {
	// 	var js, fjs = d.getElementsByTagName(s)[0];
	// 	if (d.getElementById(id)) return;
	// 	js = d.createElement(s); js.id = id;
	// 	js.src = "//connect.facebook.net/tr_TR/all.js#xfbml=1&appId=1430036597242723";
	// 	fjs.parentNode.insertBefore(js, fjs);
	// }(document, 'script', 'facebook-jssdk'));


}
