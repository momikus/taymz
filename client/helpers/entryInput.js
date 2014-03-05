Template.entryInput.helpers ({
	localTimelineNode:function() {
		return LocalTimeline.findOne().milestone;	
	},
});
Handlebars.registerHelper('ayaYilaGoreGun', function(month, year) {
	if ( month>0 && month < 13 && (month!=2 || year%4 ==0)) {
		var gunArr = ['<option value="29">29</option>']
		if (month != 2) {
			gunArr.push('<option value="30">30</option>');
			if (month==1||month==3||month==5||month==7||month==8||month==10||month==12) {
				gunArr.push('<option value="31">31</option>');
			}
		}
		console.log(gunArr)
		return new Handlebars.SafeString (gunArr)
	}
});
Template.entryInput.events ({
	'blur .birimOlayContainer textarea.manset, blur input.tarih':function(e) { // zorunlu alanlara yazmadan blur olunca uyar
		if(!$(e.currentTarget).val()) {
			$(e.currentTarget).addClass('warning');
		}
		else {
			$(e.currentTarget).removeClass('warning');
		}
	},
	'focus textarea.manset':function(e) { //manşet yazma alanına focus olunca counter açılır
		$(e.currentTarget).parent().find('span.counterManset').show();
	},
	'blur textarea.manset':function(e) { //manşet yazma alanına blur olunca counter kapanır
		$(e.currentTarget).parent().find('span.counterManset').hide();
	},
	'focus textarea.desc':function(e) { //desc yazma alanına focus olunca counter açılır
		$(e.currentTarget).parent().find('span.counterDesc').show();
	},
	'blur textarea.desc':function(e) { //desc yazma alanına blur olunca counter kapanır
		$(e.currentTarget).parent().find('span.counterDesc').hide();
	},
	'click .addOlay':function() {
		$('.birimOlay').each(function() {
			if (!$(this).find('textarea.manset').val()) {
				$(this).find('textarea.manset').addClass('warning');
			}
			else {
				$(this).find('textarea.manset').removeClass('warning');
			}
			if (!$(this).find('input.tarih').val()) {
				$(this).find('input.tarih').addClass('warning');
			}
			else {
				$(this).find('input.tarih').removeClass('warning');
			}
		});
		var isValidYil; // Girilmiş olması gereken tüm yıllar valid mi
		$("input.tarih").each(function() {
		   var element = $(this);
		   if (element.val() == "") {
		       isValidYil = false;
		   }
		});
		var isValidManset; // Girilmiş olması gereken tüm manşetler valid mi
		$("textarea.manset").each(function() {
		   var element = $(this);
		   if (element.val() == "") {
		       isValidManset = false;
		   }
		});
		if (isValidYil == false || isValidManset == false ) { // Yeni olay açabilir miyim?
			console.log("yenisini açamam")
		}
		else {
			$('.birimOlay').each(function() {
				var id = $(this).attr('id');
				var tagline = $(this).find('textarea.manset').val();
				var desc = $(this).find('textarea.desc').val();
				var img = "resim2.jpg";
				var year = $(this).find('input.tarih').val();
				var month = $(this).find('select.month').val();
				var day = $(this).find('select.day').val();
				LocalTimeline.update({"milestone._id":id },{$set: {
					"milestone.$.tagline": tagline,
					"milestone.$.desc":desc,
					"milestone.$.img":"resim2.jpg",
					"milestone.$.year":year,
					"milestone.$.month":month,
					"milestone.$.day":day
				}});
			});
		}
	},
	'change select.month':function(e) { // Ay seçildiği an gün seçeneklerinin ona göre güncellenmesi
		var yil = parseFloat($(e.currentTarget).parent().parent().find('input.tarih').val())
			if( yil%4 == 0 )
				Session.set("subatHali", 29)
			else 
				Session.set("subatHali", 28)
		var ay = $(e.currentTarget).find('option:selected').val();
		var ayOptionHtml = ayVerGunAl(ay); // Ayların kaç çektiğine göre gün sayısını belirliyoruz.
		$(e.currentTarget).parent().find('select.day').html(ayOptionHtml);
		$(e.currentTarget).parent().find('select.day').prop("disabled", false)
	},
	'keyup input.tarih':function(e) {
		// Yıl değiştirirse ay-günü disable ediyoruz
		$(e.currentTarget).parent().find('select.month').prop("disabled", "disabled");
		$(e.currentTarget).parent().find('select.month').val(0)
		$(e.currentTarget).parent().find('select.day').prop("disabled", "disabled");
		$(e.currentTarget).parent().find('select.day').val(0)
		var yil = parseFloat($(e.currentTarget).val());
		if(!isNaN(yil)) {
			$(e.currentTarget).parent().find('select.month').prop("disabled", false)
			$(e.currentTarget).parent().find('select.month').val(0);
			if( yil > 2014) {
				$(e.currentTarget).val(2014);
				alert('Gelecek ile ilgili tahminlerimizin de yer alabileceği fantastik özellik 2014 yazında dostum!');
			}
			else if (yil < 0) {
				$(e.currentTarget).val(0);
				alert('Milattan öncesi ve hatta tarih öncesi dönemlerin de yer alabilmesi olaylarını geliştiriyouz. 2014 yazında hazır!');
			}
			else {
				$(e.currentTarget).val(yil);
			}
		}
		else {
			$(e.currentTarget).val(null);
			$(e.currentTarget).parent().find('select.month').prop("disabled", "disabled");
			$(e.currentTarget).parent().find('select.day').prop("disabled", "disabled");
		}	
	}
});

Template.entryInput.rendered = function() {
	
	// compatibility de hazır bir kütüphane ile başlığa sınır konuyor + counter ile kullanıcıya gösteriliyor
	$('#title').simplyCountable({
		counter: 	'#counterTitle', // A jQuery selector to match the 'counter' element.
		maxCount:	80, // The maximum character (or word) count of the text input or textarea. 
	});

	$('.manset').simplyCountable({
		counter: 	'.counterManset', // A jQuery selector to match the 'counter' element.
		maxCount:	100, // The maximum character (or word) count of the text input or textarea. 
	});

	$('.desc').simplyCountable({
		counter: 	'.counterDesc', // A jQuery selector to match the 'counter' element.
		maxCount:	500, // The maximum character (or word) count of the text input or textarea. 
	});
	// bitti

	// Textareanın otomatik olarak dikey büyümesi için. Compatibilityde kütüphanesi var.
	$('#title').autosize();
	$('.manset').autosize();
	$('.desc').autosize();
	// bitti

	// Tarihte yıl alanına paste yapılmasını engelliyoruz. 
	// Şimdilik sadece 0 ila 2014 arası tarihleri kabul edeceğiz.
	$('input.tarih').on('paste', function(e) {
		e.preventDefault();
	});
	// bitti

	// Bu fonksiyon başlık ve manşette kullanıcıların line break (enter - paragraf) yapamamasını sağlıyor.
	// Multiple events olduğu için (paste'i de engellemek gerek) events kısmında yazılamadı
	$('.noLineBreak').on('keyup paste focus blur', function() {
		var msg = $(this).val().replace(/\n/g, "");
		$(this).val(msg);
	});
	// bitti
};