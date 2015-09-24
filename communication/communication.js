(function(ext)
{
	window["oldBroadcast"] = "";
	$.ajax(
	{
		async:false,
		type:'GET',
		url:'https://cdn.firebase.com/js/client/2.2.4/firebase.js',
		data:null,
		success: function()
		{
			fb = new Firebase('https://scratchxchat.firebaseio.com');
			fb.child('currentbroadcast').on('value', function(snap)
			{
				if( window["oldBroadcast"] == "" )
				{
					window["oldBroadcast"] = snap.val().rand;
				}
				window["currentBroadcast"] = snap.val().rand;
				window["broadcastTag"] = snap.val().message.split(" ")[0];
				window["broadcastMessage"] = snap.val().message.substring((window["broadcastTag"].length)+1,(snap.val().message.length));
			});
		},
		dataType:'script'
	});
    
	ext._shutdown = function() {};

	ext._getStatus = function()
	{
		return {status: 2, msg: 'Ready'};
	};

	ext.broadcast = function(tTag, tMessage)
	{
		if( ( tMessage.length > 0 ) && ( tTag.length > 0 ) )
		{
			if( tTag.indexOf(" ") == -1 )
			{
				window["oldBroadcast"] = tTag + " " + tMessage;
				fb.child('currentbroadcast').set({rand:Math.random(),message:tTag + " " + tMessage});
			}
			else
			{
				alert("The tag can't contain spaces. You're message has not been sent.");
			}
		}
		else
		{
			alert("The tag or message can't be blank. You're message has not been sent.");
		}
	};
    
	ext.mesh_hat = function()
	{
		if( window["currentBroadcast"] != window["oldBroadcast"] )
		{
			window["oldBroadcast"] = window["currentBroadcast"];
			return true;
		}
		else
		{
			return false;
		}
	}
	
	ext.get_mesh = function()
	{
		return window["broadcastMessage"];
	};
	
	ext.get_tag = function()
	{
		return window["broadcastTag"];
	};

	var descriptor = {
		blocks: [
			[' ', 'send tag %s message %s', 'broadcast'],
			['h', 'when new message available', 'mesh_hat'],
			['r', 'message', 'get_mesh',],
			['r', 'tag', 'get_tag',]
		]
	};

	ScratchExtensions.register('Communication Plus', descriptor, ext);
})({});
