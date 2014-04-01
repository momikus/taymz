Template.birimOlayInput.rendered = function () {

	// update ekranına varolan ay ve günleri selected almak
	$('.birimOlay').each(function () {
		var month = parseInt($(this).find('select[name^=' +
			'"monthlist"]').attr('value'));
		$(this).find('select[name^="monthlist"] option[value="' +
			month + '"]').attr('selected', 'selected');
		var day = parseInt($(this).find('select[name^="daylist"]').attr('value'));
		$(this).find('select[name^="daylist"] option[value="' +
			day + '"]').attr('selected', 'selected');
	});

	// Textareanın otomatik olarak dikey büyümesi 
	// için. Compatibilityde kütüphanesi var.
	$('.manset').autosize();
	$('.desc').autosize();
	Meteor.setTimeout(function() {
		$('#title').autosize();
	}, 300)			
};

Template.birimOlayInput.helpers({

});

