function randomQuote() {
	var quotes = [
		"Tarih ihtiyatsızlar için merhametsizdir.<br><strong>Atatürk</strong>", 
		"Tarihe karşı görevimiz onu yeniden yazmaktır.<br><strong>Oscar Wilde</strong>", 
		"Bir toplum, iyi tarih yazıyorsa rafine bir toplum olur.<br><strong>İlber Ortaylı</strong>",
		"Dünya tarihi, özgürlüğün bilincinde ilerlemedir.<br><strong>Georg Wilhelm Friedrich Hegel</strong>",
		"Filozoflar dünyayı yalnızca çeşitli biçimlerde yorumlamışlardır; oysa sorun onu değiştirmektir.<br><strong>Karl Marx</strong>",
		"Herkes tarih yapabilir, ancak sadece büyük bir adam tarih yazabilir.<br><strong>Oscar Wilde</strong>",
		"İki tarih vardır: Yalancı olan resmi tarih, bir de olayların gerçek sebebini barındıran gizli tarih.<br><strong>Honoré de Balzac</strong>",
		"<br><strong></strong>",
		"<br><strong></strong>",
		"<br><strong></strong>",
	]
	var images = [
		"ataturk.jpg", 
		"oscar-wilde.jpg", 
		"ilber-ortayli.jpg",
		"hegel.jpg",
		"karl-marx.jpg",
		"oscar-wilde.jpg",
		"balzac.jpg"
	];
	var ra = _.random(0, 6)
	$('.quote div').html(quotes[ra]);
	$('#celeb').attr('src','/img/quote/'+images[ra]);
}