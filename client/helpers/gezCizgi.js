Template.gezCizgi.rendered = function() {
	
	//Carousel içindeki her bir link genişliğini alıyoruz (margini içerecek şekilde)
	var carouselLinkWidth = parseFloat($('.carousel a').css('width')) +20;
	Session.set('carouselLinkWidth',carouselLinkWidth);
	// bitti
	
	//Burada cizgiSayisi her bir timelineı ifade eder (değişkenlere bağlı hesap yapmak için alıyoruz)
	var cizgiSayisi = 12;
	Session.set('cizgiSayisi', cizgiSayisi);
	//bitti

	// Carouselin toplam widthini define ediyoruz
	$('.carousel').css('width', Session.get('cizgiSayisi')*Session.get('carouselLinkWidth')+20);
	var carouselWidth = parseFloat($('.carousel').css('width'));
	Session.set('carouselWidth',carouselWidth);
	// bitti

};

Template.gezCizgi.events ({
	// Carouseli kaydırma olayları ileri&geri
	'click i':function(event) {
		var x = $(event.currentTarget);
		var carousel = x.parent().find('.carousel');
		var carouselLeftRight = carousel.position().left;
		if(x.hasClass('fa-chevron-circle-right') // caroselin ileri butonuna tıklarsa
			&& Session.get('splitDegree') < (Session.get('cizgiSayisi')/4)-1) {
			//console.log('lksdf')
			Session.set('splitDegree', Session.get('splitDegree')+1);
			carousel.animate({"left" :(-4*Session.get('splitDegree')*Session.get('carouselLinkWidth'))}, 300);
		}
		else if (x.hasClass('fa-chevron-circle-left') // caroselin geri butonuna tıklarsa
			&& Session.get('splitDegree') > 0) {
			//console.log('lksdf')
			Session.set('splitDegree', Session.get('splitDegree')-1);
			carousel.animate({"left" :(-4*Session.get('splitDegree')*Session.get('carouselLinkWidth'))}, 300);
		}
		else {
			// do nothing
		}
	}
	// bitti
});