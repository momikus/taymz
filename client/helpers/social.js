Template.social.rendered = function () {

		//Twitter için
		!function(d,s,id){
			var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
			if(!d.getElementById(id)){js=d.createElement(s);js.id=id;
				js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);
			}
		}(document, 'script', 'twitter-wjs');
	
		// g+ için
    	window.___gcfg = {lang: 'tr'};
    	  (function() {
    	  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    	  po.src = 'https://apis.google.com/js/platform.js';
    	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    	})();
}