var global_username = '';
$('#answer').hide();
$('#hangup').hide();

/*** After successful authentication, show user interface ***/
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


var createUser = function(){
	var signUpObj = {};
	signUpObj.username = 'central_sigem';
	signUpObj.password = 'mindefsigem';

	//Use Sinch SDK to create a new user
	sinchClient.newUser(signUpObj, function (ticket) {
		//On success, start the client
		sinchClient.start(ticket, function () {
			global_username = signUpObj.username;
			//On success, show the UI
			showUI();

			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		}).fail(handleError);
	}).fail(handleError);
};


var startLogin = function(){
	var signInObj = {};
	signInObj.username = 'central_sigem';
	signInObj.password = 'mindefsigem';

	//Use Sinch SDK to authenticate a user
	sinchClient.start(signInObj, function () {
		global_username = signInObj.username;
		//On success, show the UI
		showUI();

		//Store session & manage in some way (optional)
		localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		callApp();
	}).fail(handleError);
};

var callApp = function(){
	$('button').addClass('incall');

	$('div#callLog').append('<div id="title">Calling prueba</div>');

	var userId = findGetParameter('uid');
	if(userId){
		call = callClient.callUser(userId);
		call.addEventListener(callListeners);
	}
		
	
};

var showUI = function () {
	$('div#call').show();
	$('form#userForm').css('display', 'none');
	$('div#userInfo').css('display', 'inline');
	$('h3#login').css('display', 'none');
	$('video').show();
	$('span#username').text(global_username);
}


/*** If no valid session could be started, show the login interface ***/

var showLoginUI = function () {
	$('form#userForm').css('display', 'inline');
}


//*** Set up sinchClient ***/

sinchClient = new SinchClient({
	applicationKey: '4be192eb-0f60-4c0e-8f44-3411d2262e53',
	//applicationKey: 'de6fd769-0a6c-4b08-8660-3473b3f0ea07',
	capabilities: { calling: true, video: true },
	supportActiveConnection: true,
	//Note: For additional loging, please uncomment the three rows below
	onLogMessage: function (message) {
		console.log(message);
	},
});

sinchClient.startActiveConnection();

/*** Name of session, can be anything. ***/

var sessionName = 'sinchSessionVIDEO-' + sinchClient.applicationKey;


/*** Check for valid session. NOTE: Deactivated by default to allow multiple browser-tabs with different users. ***/

var sessionObj = JSON.parse(localStorage[sessionName] || '{}');
if (sessionObj.userId) {
	sinchClient.start(sessionObj)
		.then(function () {
			global_username = sessionObj.userId;
			//On success, show the UI
			showUI();
			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
			callApp();
		})
		.fail(function () {
			//No valid session, take suitable action, such as prompting for username/password, then start sinchClient again with login object
			showLoginUI();
		});
}
else {
	startLogin();
	// createUser();
	//showLoginUI();
}


/*** Create user and start sinch for that user and save session in localStorage ***/

$('button#createUser').on('click', function (event) {
	event.preventDefault();
	$('button#loginUser').attr('disabled', true);
	$('button#createUser').attr('disabled', true);
	clearError();

	var signUpObj = {};
	signUpObj.username = $('input#username').val();
	signUpObj.password = $('input#password').val();

	//Use Sinch SDK to create a new user
	sinchClient.newUser(signUpObj, function (ticket) {
		//On success, start the client
		sinchClient.start(ticket, function () {
			global_username = signUpObj.username;
			//On success, show the UI
			showUI();

			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		}).fail(handleError);
	}).fail(handleError);
});

/*** Login user and save session in localStorage ***/

$('button#loginUser').on('click', function (event) {
	event.preventDefault();
	$('button#loginUser').attr('disabled', true);
	$('button#createUser').attr('disabled', true);
	clearError();

	var signInObj = {};
	signInObj.username = $('input#username').val();
	signInObj.password = $('input#password').val();

	//Use Sinch SDK to authenticate a user
	sinchClient.start(signInObj, function () {
		global_username = signInObj.username;
		//On success, show the UI
		showUI();

		//Store session & manage in some way (optional)
		localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
	}).fail(handleError);
});



/*** Create audio elements for progresstone and incoming sound */
const audioProgress = document.createElement('audio');
const audioRingTone = document.createElement('audio');
const videoIncoming = document.getElementById('videoincoming');
const videoOutgoing = document.getElementById('videooutgoing');

/*** Define listener for managing calls ***/
var callListeners = {
	onCallProgressing: function (call) {
		audioProgress.src = 'style/ringback.wav';
		audioProgress.loop = true;
		audioProgress.play();
		videoOutgoing.srcObject = call.outgoingStream;
		
		$('#answer').show();
		$('#hangup').hide();

		//Report call stats
		$('div#callLog').append('<div id="stats">Ringing...</div>');
	},
	onCallEstablished: function (call) {
		videoOutgoing.srcObject = call.outgoingStream;
		videoIncoming.srcObject = call.incomingStream;
		audioProgress.pause();
		audioRingTone.pause();

		$('#answer').hide();
		$('#hangup').show();
		//Report call stats
		var callDetails = call.getDetails();
		$('div#callLog').append('<div id="stats">Answered at: ' + (callDetails.establishedTime && new Date(callDetails.establishedTime)) + '</div>');
	},
	onCallEnded: function (call) {
		audioProgress.pause();
		audioRingTone.pause();
		videoIncoming.srcObject = null;
		videoOutgoing.srcObject = null;

		$('button').removeClass('incall');
		$('button').removeClass('callwaiting');

		$('#answer').hide();
		$('#hangup').hide();
		//Report call stats
		var callDetails = call.getDetails();
		$('div#callLog').append('<div id="stats">Ended: ' + new Date(callDetails.endedTime) + '</div>');
		$('div#callLog').append('<div id="stats">Duration (s): ' + callDetails.duration + '</div>');
		$('div#callLog').append('<div id="stats">End cause: ' + call.getEndCause() + '</div>');
		if (call.error) {
			$('div#callLog').append('<div id="stats">Failure message: ' + call.error.message + '</div>');
		}
	}
}

/*** Set up callClient and define how to handle incoming calls ***/

var callClient = sinchClient.getCallClient();
callClient.initStream().then(function () { // Directly init streams, in order to force user to accept use of media sources at a time we choose
	$('div.frame').not('#chromeFileWarning').show();
});
var call;

callClient.addEventListener({
	onIncomingCall: function (incomingCall) {
		//Play some groovy tunes 
		audioRingTone.src = 'style/phone_ring.wav';
		audioRingTone.loop = true;
		audioRingTone.play();

		//Print statistics
		$('div#callLog').append('<div id="title">Incoming call from ' + incomingCall.fromId + '</div>');
		$('div#callLog').append('<div id="stats">Ringing...</div>');
		$('button').addClass('incall');
		
		$('#answer').show();
		$('#hangup').hide();
		
		//Manage the call object
		call = incomingCall;
		call.addEventListener(callListeners);
		$('button').addClass('callwaiting');

		//call.answer(); //Use to test auto answer
		//call.hangup();
	}
});

$('button#answer').click(function (event) {
	event.preventDefault();

	if ($(this).hasClass("callwaiting")) {
		clearError();

		try {
			call.answer();
			$('button').removeClass('callwaiting');
		}
		catch (error) {
			handleError(error);
		}
	}
});

/*** Make a new data call ***/

$('button#call').click(function (event) {
	event.preventDefault();

	if (!$(this).hasClass("incall") && !$(this).hasClass("callwaiting")) {
		clearError();

		$('button').addClass('incall');

		$('div#callLog').append('<div id="title">Calling ' + $('input#callUserName').val() + '</div>');

		console.log('Placing call to: ' + $('input#callUserName').val());
		call = callClient.callUser($('input#callUserName').val());

		call.addEventListener(callListeners);
	}
});

/*** Hang up a call ***/

$('button#hangup').click(function (event) {
	event.preventDefault();
	call && call.hangup();
	//window.open(location, '_self');
	window.close();

	// if ($(this).hasClass("incall")) {
	// 	clearError();

	// 	console.info('Will request hangup..');

	// 	call && call.hangup();
	// }
});

/*** Log out user ***/

$('button#logOut').on('click', function (event) {
	event.preventDefault();
	clearError();

	//Stop the sinchClient
	sinchClient.terminate();
	//Note: sinchClient object is now considered stale. Instantiate new sinchClient to reauthenticate, or reload the page.

	//Remember to destroy / unset the session info you may have stored
	delete localStorage[sessionName];

	//Allow re-login
	$('button#loginUser').attr('disabled', false);
	$('button#createUser').attr('disabled', false);

	//Reload page.
	window.location.reload();
});


/*** Handle errors, report them and re-enable UI ***/

var handleError = function (error) {
	//Enable buttons
	$('button#createUser').prop('disabled', false);
	$('button#loginUser').prop('disabled', false);

	//Show error
	$('div.error').text(error.message);
	$('div.error').show();
}

/** Always clear errors **/
var clearError = function () {
	$('div.error').hide();
}

/** Chrome check for file - This will warn developers of using file: protocol when testing WebRTC **/
if (location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	$('div#chromeFileWarning').show();
}

$('button').prop('disabled', false); //Solve Firefox issue, ensure buttons always clickable after load



//startLogin();
 //createUser();

