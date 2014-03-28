function randomQuote() {
	var quotes = [
		"Tarih ihtiyatsızlar için merhametsizdir", 
		"Tarihe karşı görevimiz onu yeniden yazmaktır", 
		"Bir toplum, iyi tarih yazıyorsa rafine bir toplum olur",
	]
	var images = [
		"ataturk.jpg", 
		"oscar-wilde.jpg", 
		"ilber-ortayli.jpg"
	];
	var ra = _.random(0, 2)
	console.log(ra)
	$('.quote span').html(quotes[ra]);
	$('#celeb').attr('src','/img/quote/'+images[ra]);
}