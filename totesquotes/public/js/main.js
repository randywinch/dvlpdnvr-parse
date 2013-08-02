var TotesQuotes = TotesQuotes || {};

TotesQuotes.isLoggedIn = function() {
	if(Parse.User.current() && Parse.User.current().authenticated()){
		return true;
	} else {
		return false;
	}
}

TotesQuotes.updateLoginText = function(){
	if(TotesQuotes.isLoggedIn()){
		$('#loginButton').text('Sign Out');
	} else {
		$('#loginButton').text('Sign In With Facebook');
		$('#userName').text('');
	}	
}

TotesQuotes.toggleLogin = function() {
	if(TotesQuotes.isLoggedIn()){
		TotesQuotes.logout();
		TotesQuotes.updateLoginText();
	} else {
		TotesQuotes.login();
	}
}

TotesQuotes.login = function(){
	Parse.FacebookUtils.logIn('email', {
	  success: function(user) {
	    if (!user.existed()) {
	      // alert("User signed up and logged in through Facebook!");
	    } else {
	      // alert("User logged in through Facebook!");
	    }
	    TotesQuotes.updateLoginText();
	  },
	  error: function(user, error) {
	    alert("User cancelled the Facebook login or did not fully authorize.");
	  }
	});	
}

TotesQuotes.logout = function(){
	Parse.User.logOut()
}


TotesQuotes.init = function(){
	TotesQuotes.updateLoginText();

	FB.api('/me',function(data){
		if(data.name){
			$('#userName').text(data.name);
		}
	});

	//Check for comment form
	if($('#frmComment').length > 0){
		$('#frmComment').on('submit',function(e){
			//simple check for empty comment
			if($('#frmCommentText').val() === ''){
				return false;
			}

		});

	}
}