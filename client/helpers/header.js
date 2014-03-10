Template.header.helpers({
	varoAdmin: function () {
		if (Session.equals('varoAdmin', true))
			return true;
	}
});