function randomQuote() {
	var quotes = [
		"Tarih <a href='/t/34'>ihtiyatsız</a>lar için merhametsizdir.<br><strong>Atatürk</strong>", 
		"Tarihe karşı görevimiz onu yeniden yazmaktır.<br><strong>Oscar Wilde</strong>", 
		"Bir toplum, iyi tarih yazıyorsa rafine bir toplum olur.<br><strong>İlber Ortaylı</strong>",
		"Dünya tarihi, özgürlüğün bilincinde ilerlemedir.<br><strong>Georg Wilhelm Friedrich Hegel</strong>",
		"Filozoflar dünyayı yalnızca çeşitli biçimlerde yorumlamışlardır; oysa sorun onu değiştirmektir.<br><strong>Karl Marx</strong>",
		"Herkes tarih yapabilir, ancak sadece büyük bir adam tarih yazabilir.<br><strong>Oscar Wilde</strong>",
		"İki tarih vardır: Yalancı olan resmi tarih, bir de olayların gerçek sebebini barındıran <a href='/t/41'>gizli tarih</a>.<br><strong>Honoré de Balzac</strong>",
		"Allahıma yemin olsun ki, senin ruhun benim ruhumun önünde diz çöker <a href='/t/67'>tövbe</a> ister!<br><strong>Nihat Doğan - 2007</strong>",
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
		"balzac.jpg",
		"nihat-dogan.jpg"
	];
	var ra = _.random(0, 7)
	$('.quote div').html(quotes[ra]);
	$('#celeb').attr('src','/img/quote/'+images[ra]);
}