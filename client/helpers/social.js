Template.social.rendered = function () {
	Meteor.setTimeout(function() {
		!function(d,s,id){
			var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
			if(!d.getElementById(id)){js=d.createElement(s);js.id=id;
				js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);
			}
		}(document, 'script', 'twitter-wjs');
	
    	window.___gcfg = {lang: 'tr'};
    	  (function() {
    	  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    	  po.src = 'https://apis.google.com/js/platform.js';
    	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    	})();
	
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/tr_TR/all.js#xfbml=1&appId=1430036597242723";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}, 1500)
}