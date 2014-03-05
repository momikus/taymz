Template.entryInput.events ({
	'click .submit': function(event) {
		var baslik = $('.baslik').val();
		var ozet = $('.ozet').val();
		var resim = $('.resim').val();
		var yil = $('.yil').val();
		var ay = $('.ay').val();
		var gun = $('.gun').val();
		Olaylar.insert({baslik:baslik, ozet:ozet,resim:resim, yil:yil, ay:ay, gun:gun });
	},
	'focus .manset': function(event) {
		var y = $(event.currentTarget).parent();
		y.find(".counterManset").show();
	},
	'blur .manset': function(event) {
		var y = $(event.currentTarget).parent();
		y.find(".counterManset").hide();
	},
	'focus .desc': function(event) {
		var y = $(event.currentTarget).parent();
		y.find(".counterDesc").show();
	},
	'blur .desc': function(event) {
		var y = $(event.currentTarget).parent();
		y.find(".counterDesc").hide();
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

	// Tarihi 0 ila 2014 arası bir değer almaya zorluyouz.
	// Ayların kaç çektiğine göre gün sayısını belirliyoruz.
	// Yıl değeri null olursa ay gün disable tutuyoruz.
	// Ay gün seçtikten sonra yıl değiştirirse ay-günü disable ediyoruz
	$('input.tarih').on('keyup', function(e) {
		var x = parseFloat($(this).val());
		if(!isNaN(x)) {
			$('select.month').prop("disabled", false)
			$('select.month').val(0);
			if( x%4 == 0 )
				Session.set("subatHali", 29)
			else 
				Session.set("subatHali", 28)
			if( x > 2014) {
				$(this).val(2014);
				alert('Gelecek ile ilgili tahminlerimizin de yer alabileceği fantastik özellik 2014 yazında dostum!');
			}
			else if (x < 0) {
				$(this).val(0);
				alert('Milattan öncesi ve hatta tarih öncesi dönemlerin de yer alabilmesi olaylarını geliştiriyouz. 2014 yazında hazır!');
			}
			else {
				$(this).val(x);
			}
		}
		else {
			$(this).val(null);
			$('select.month').prop("disabled", "disabled");
			$('select.day').prop("disabled", "disabled");
		}		
	});

	$('select.month').change(function() {
		var ay = $('.month option:selected').val();
		if (ay > 0 && ay < 13) {
			var ayArr = ['<option value="0">Gün</option>'];
			if (ay==1||ay==3||ay==5||ay==7||ay==8||ay==10||ay==12) {
				for (var i=1;i<32;i++) {
					ayArr.push('<option value="'+i+'">'+i+'</option>');
				}
			}
			else if(ay==4||ay==6||ay==9||ay==11) {
				for (var i=1;i<31;i++) {
					ayArr.push('<option value="'+i+'">'+i+'</option>');
				}
			}
			else if(ay==2) {
				if(Session.get("subatHali") == 28) {
					for (var i=1;i<29;i++) {
						ayArr.push('<option value="'+i+'">'+i+'</option>');
					}
				}
				else if (Session.get("subatHali") == 29) {
					for (var i=1;i<30;i++) {
						ayArr.push('<option value="'+i+'">'+i+'</option>');
					}
				}
			}
			var ayOptionHtml = ayArr.join(' ');
			$('select.day').html(ayOptionHtml);
			$('select.day').prop("disabled", false)
		}
	});
	// bitti


	// Bu fonksiyon başlık ve manşette kullanıcıların line break (enter - paragraf) yapamamasını sağlıyor.
	// Multiple events olduğu için (paste'i de engellemek gerek) events kısmında yazılamadı
	$('.noLineBreak').on('keyup paste focus blur', function() {
		var msg = $(this).val().replace(/\n/g, "");
		$(this).val(msg);
	});
	// bitti
}