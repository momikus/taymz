function ayVerGunAl(ay) {
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
		return ayOptionHtml;
	}	
}	
