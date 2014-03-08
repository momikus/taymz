Template.birimOlayInput.rendered = function() {
	// update ekranına varolan ay ve günleri selected almak
	$('.birimOlay').each(function() {
		var month = parseInt($(this).find('select[name^="monthlist"]').attr("value"));
		$(this).find('select[name^="monthlist"] option[value="'+month+'"]').attr('selected','selected');
		var day = parseInt($(this).find('select[name^="daylist"]').attr("value"));
		$(this).find('select[name^="daylist"] option[value="'+day+'"]').attr('selected','selected');
	});
}

