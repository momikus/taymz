function inputValidate() {

	// Gereken yerlere warning yapılıyor
	$('.birimOlay').each(function () {
		if (!$(this).find('textarea.manset').val()) {
			$(this).find('textarea.manset').addClass('warning');
		} else {
			$(this).find('textarea.manset').removeClass('warning');
		}
		if (!$(this).find('input.tarih').val()) {
			$(this).find('input.tarih').addClass('warning');
		} else {
			$(this).find('input.tarih').removeClass('warning');
		}
	});

	// Girilmiş olması gereken tüm yıllar valid mi
	var isValidYil;
	$('input.tarih').each(function () {
			var element = $(this);
			if (element.val() === '')
				isValidYil = false;
		}
	);

	// Girilmiş olması gereken tüm manşetler valid mi
	var isValidManset;
	$('textarea.manset').each(function () {
		var element = $(this);
		if (element.val() === '')
			isValidManset = false;
	});

	// Resimler girilmiş mi
	var isValidImg;
	for(var i=0;i<LocalTimeline.findOne().milestones.length;i++) {
		if (LocalTimeline.findOne().milestones[i].img === "") {
			isValidImg = false;
			alert("Her olayın bir görseli olmalı.");
		}

	};

	// Yeni olay açabilir miyim?
	if (isValidYil === false || isValidManset === false || isValidImg === false) {
		return false;
	} else
		return true;
}

function titleValidate() {
	if (!$.trim($('textarea#title').val())) {
		$('textarea#title').addClass('warning');
		return false;
	} else
		return true;
}

function titleUpdater() {
	var title = $("textarea#title").val();
	LocalTimeline.update({},{$set:{
		title:title
	}});
}

function milestonesUpdater() {
	$('.birimOlay').each(function () {
		var id = $(this).attr('id');
		var tagline = $(this).find('textarea.manset').val();
		var desc = $(this).find('textarea.desc').val();
		var year = parseInt($(this).find('input.tarih').val());
		var month = parseInt($(this).find('select.month').val());
		var day = parseInt($(this).find('select.day').val());
		LocalTimeline.update({'milestones._id': id}, {$set: {
			'milestones.$.tagline': tagline,
			'milestones.$.desc': desc,
			'milestones.$.year': year,
			'milestones.$.month': month,
			'milestones.$.day': day
		}});
	});
}

function deleteValidate() {
	var taymLenAbove3 = LocalTimeline.find({
		$where: 'this.milestones.length > 3'
	}).count();
	return taymLenAbove3; // returns 1 or 0 which is true or false respectively
}

function thumbnailValidate() {
	if (LocalTimeline.findOne().mainimg === null) {
		alert("Galeride görünmesi için bir ana resim ekle");
		return false;
	}
	else
		return true;
}
