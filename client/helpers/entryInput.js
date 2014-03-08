Template.entryInput.helpers({
	localTimelineNode: function () {
		if (LocalTimeline.findOne() !== undefined)
			return LocalTimeline.findOne().milestones;			 
	},
	localTimelineTitle: function () {
		if (LocalTimeline.findOne() !== undefined)
			return LocalTimeline.findOne().title;
	},
	submit: function() {
		if (Router.current().route.name == 'add')
			return new Handlebars.SafeString ('<button id="yayinla" class="noSelection">Yayınla</button>');
		else if (Router.current().route.name == 'edit')
			return new Handlebars.SafeString ('<button id="guncelle" class="noSelection">Güncelle</button>');
	}
});

Handlebars.registerHelper('ayaYilaGoreGun', function(month, year) {
	if ( month > 0 && month < 13 && (month !== 2 || year % 4 === 0)) {
		var gunArr = ['<option value="29">29</option>'];
		if (month != 2) {
			gunArr.push('<option value="30">30</option>');
			if (month==1||month==3||month==5||month==7||month==8||month==10||month==12) {
				gunArr.push('<option value="31">31</option>');
			}
		}
		return new Handlebars.SafeString (gunArr);
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

	// upload image
	'click div.gorselYukle': function () {
		var milestoneId = this._id;
		filepicker.setKey('AwZnN4OdwSLK02ZzAFkvrz');
		filepicker.pickAndStore({
				mimetypes: ['image/*'],
					container: 'modal',
					services :['COMPUTER', 'URL', 'IMAGE_SEARCH']
			},
			{
				location: 'S3',
				path    : '/',
				access  : 'public'
			},
			function(InkBlob){
				milestonesUpdater();
				LocalTimeline.update({'milestones._id': milestoneId}, {$set: {
					'milestones.$.img': InkBlob[0].key
				}});
			},
			function(FPError){
				//do nothing
			}
		);
	},
	'click #addOlay':function() {
		if (inputValidate() === false ) { // Yeni olay açabilir miyim?
			console.log("yenisini açamam");
		} else {
			titleUpdater();
			milestonesUpdater();
			LocalTimeline.update({},{$push:{milestones: 
				{	
					_id: new Meteor.Collection.ObjectID()._str,
					tagline: "",
					desc: "",
					img: "",
				},
			}});
		}
	},

	// validates inputs and insert into db
	'click #yayinla': function () {
		if (inputValidate() === false || titleValidate() === false ) {
			console.log("yayinlanamaz");
		} else {

			// update local title 
			titleUpdater();

			// update local milestones
			milestonesUpdater();

			// get the milestones and the title
			var milestones = LocalTimeline.findOne().milestones;
			var title = LocalTimeline.findOne().title;

			// insert to db
			Meteor.call('timelineInsert', title, milestones);

			// route to main page
			Router.go('/');

			// empty local collection
			LocalTimeline.update({}, {$set:{title:'', milestones: [
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
			]}});
		}
	},
	'click #guncelle': function () {
		if (inputValidate() === false || titleValidate() === false ) {
			console.log("güncellenemez");
		} else {

			// update local title 
			titleUpdater();

			// update local milestones
			milestonesUpdater();

			// get the tid, the milestones and the title
			var tid = LocalTimeline.findOne().tid;
			var milestones = LocalTimeline.findOne().milestones;
			var title = LocalTimeline.findOne().title;

			// insert to db
			Meteor.call('timelineUpdate', tid, title, milestones);

			// route to main page
			Router.go('/t/'+tid);

			// empty local collection
			LocalTimeline.update({}, {$set:{title:'', milestones: [
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
			]}});
		}
	},
	'change select.month':function(e) { // Ay seçildiği an gün seçeneklerinin ona göre güncellenmesi
		var yil = parseInt($(e.currentTarget).parent().parent().find('input.tarih').val());
			if ( yil % 4 === 0 )
				Session.set("subatHali", 29);
			else 
				Session.set("subatHali", 28);
		var ay = $(e.currentTarget).find('option:selected').val();
		var ayOptionHtml = ayVerGunAl(ay); // Ayların kaç çektiğine göre gün sayısını belirliyoruz.
		$(e.currentTarget).parent().find('select.day').html(ayOptionHtml);
		if (parseInt($(e.currentTarget).val()) > 0 && parseInt($(e.currentTarget).val()) <= 12 ) {
			$(e.currentTarget).parent().find('select.day').prop("disabled", false);
		} else {
			$(e.currentTarget).parent().find('select.day').prop("disabled", "disabled");
		}
		$(e.currentTarget).parent().find('select.day').val("0");
	},
	'keyup input.tarih':function(e) {
		// Yıl değiştirirse ay-günü disable ediyoruz
		$(e.currentTarget).parent().find('select.month').prop("disabled", "disabled");
		$(e.currentTarget).parent().find('select.month').val(0);
		$(e.currentTarget).parent().find('select.day').prop("disabled", "disabled");
		$(e.currentTarget).parent().find('select.day').val(0);
		var yil = parseInt($(e.currentTarget).val());
		if(!isNaN(yil)) {
			$(e.currentTarget).parent().find('select.month').prop("disabled", false);
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
	},
	'click i.silici':function(e) {
		$(e.currentTarget).parent().find('.siliciPopover').show();
	},
	'click .siliciPopover .vazgectim':function(e) {
		$(e.currentTarget).parent().hide();
	},
	'click .siliciPopover .sil':function(e) {
		$(e.currentTarget).parent().hide();
		var id = $(e.currentTarget).parent().parent().attr("id");
		console.log(deleteValidate());
		if( deleteValidate() === 1) {
			LocalTimeline.update({},{$pull:{"milestones":{"_id":id}}});
		}
		else {
			alert('"En az 3 olay istiyorum!" buyurdu beyfendi.');
		}
	}
});

Template.entryInput.rendered = function() {
	
	// compatibility de hazır bir kütüphane ile başlığa sınır konuyor + counter ile kullanıcıya gösteriliyor
	$('#title').simplyCountable({
		counter: '#counterTitle', // A jQuery selector to match the 'counter' element.
		maxCount:	80, // The maximum character (or word) count of the text input or textarea. 
	});

	$('.manset').simplyCountable({
		counter: '.counterManset', // A jQuery selector to match the 'counter' element.
		maxCount:	100, // The maximum character (or word) count of the text input or textarea. 
	});

	$('.desc').simplyCountable({
		counter: '.counterDesc', // A jQuery selector to match the 'counter' element.
		maxCount:	500, // The maximum character (or word) count of the text input or textarea. 
	});

	// Textareanın otomatik olarak dikey büyümesi için. Compatibilityde kütüphanesi var.
	$('#title').autosize();
	$('.manset').autosize();
	$('.desc').autosize();

	// Tarihte yıl alanına paste yapılmasını engelliyoruz. 
	// Şimdilik sadece 0 ila 2014 arası tarihleri kabul edeceğiz.
	$('input.tarih').on('paste', function(e) {
		e.preventDefault();
	});

	// Bu fonksiyon başlık ve manşette kullanıcıların line break (enter - paragraf) yapamamasını sağlıyor.
	// Multiple events olduğu için (paste'i de engellemek gerek) events kısmında yazılamadı
	$('.noLineBreak').on('keyup paste focus blur', function() {
		var msg = $(this).val().replace(/\n/g, "");
		$(this).val(msg);
	});
};