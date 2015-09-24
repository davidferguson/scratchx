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
				if( ( snap.val().message.split(" ")[0] == window["netName"] ) || ( snap.val().message.split(" ")[0] == "global" ) )
				{
					if( window["oldBroadcast"] == "" )
					{
						window["oldBroadcast"] = snap.val().rand;
					}
					window["currentBroadcast"] = snap.val().rand;
					window["broadcastTo"] = snap.val().message.split(" ")[0];
					window["broadcastTag"] = snap.val().message.split(" ")[1];
					window["broadcastMessage"] = snap.val().message.substring((window["broadcastTo"].length+window["broadcastTag"].length+2),(snap.val().message.length));
				}
			});
		},
		dataType:'script'
	});
    
	ext._shutdown = function() {};

	ext._getStatus = function()
	{
		return {status: 2, msg: 'Ready'};
	};

	ext.sendMessage = function(tTag, tMessage, tUser)
	{
		if( tUser == "" )
		{
			tUser = "global";
		}
		if( ( tMessage.length > 0 ) && ( tTag.length > 0 ) )
		{
			if( tTag.indexOf(" ") == -1 )
			{
				if( tUser.indexOf(" ") == -1 )
				{
					window["oldBroadcast"] = tTag + " " + tMessage;
					fb.child('currentbroadcast').set({rand:Math.random(),message:tUser + " " + tTag + " " + tMessage});
				}
				else
				{
					alert("The username can't contain spaces. You're message has not been sent.");
				}
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
    
	ext.whenMessage = function()
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
	
	ext.getMessage = function()
	{
		return window["broadcastMessage"];
	};
	
	ext.getTag = function()
	{
		return window["broadcastTag"];
	};
	
	ext.setNetName = function(newNetName)
	{
		if( window["netName"] == undefined )
		{
			window["netName"] = newNetName;
		}
		else
		{
			alert("You have already set your network name. You can't change this.");
		}
	};

	var descriptor = {
		blocks: [
			[' ', 'set network name %s', 'setNetName'],
			[' ', 'send tag %s and message %s to %s', 'sendMessage'],
			['h', 'when new message available', 'whenMessage'],
			['r', 'message', 'getMessage',],
			['r', 'tag', 'getTag',]
		]
	};

	ScratchExtensions.register('Communication +2', descriptor, ext);
})({});
