function inputValidate() {
	$('.birimOlay').each(function() { // Gereken yerlere warning yapılıyor
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
		return false;
	}
	else
		return true;
}

function titleValidate() {
	if (!$.trim($("textarea#title").val())) {
		$("textarea#title").addClass('warning');
		return false
	}
	else 
		return true;
}

function milestonesUpdater() {
	$('.birimOlay').each(function() {
		var id = $(this).attr('id');
		var tagline = $(this).find('textarea.manset').val();
		var desc = $(this).find('textarea.desc').val();
		var img = "resim2.jpg";
		var year = parseInt($(this).find('input.tarih').val());
		var month = parseInt($(this).find('select.month').val());
		var day = parseInt($(this).find('select.day').val());
		LocalTimeline.update({"milestones._id":id },{$set: {
			"milestones.$.tagline": tagline,
			"milestones.$.desc":desc,
			"milestones.$.img":"resim2.jpg",
			"milestones.$.year":year,
			"milestones.$.month":month,
			"milestones.$.day":day
		}});
	});
}

function titleUpdater() {
	var title = $("textarea#title").val();
	LocalTimeline.update({},{$set:{
		title:title
	}});
}