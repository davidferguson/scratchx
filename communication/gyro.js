(function(ext)
{
	window["playerObject"] = "";
	$.ajax(
	{
		async:false,
		type:'GET',
		url:'https://cdn.firebase.com/js/client/2.2.4/firebase.js',
		data:null,
		success: function()
		{
			fb = new Firebase('https://gyroscratch.firebaseio.com');
			window["playerCode"] = Math.floor((Math.random() * 1000) + 1);
			fb.child('players').push({ 'code': window["playerCode"], 'xpos': '0', 'ypos': '0' });
			fb.child('players').on('value', function(snap)
			{
				window["playerObject"] = snap.val();
			});
		},
		dataType:'script'
	});
    
	ext._shutdown = function() {};

	ext._getStatus = function()
	{
		return {status: 2, msg: 'Ready'};
	};
	
	ext.getConnCode = function()
	{
		return window["playerCode"];
	};
	
	
	ext.getPhoneX = function( playerName )
	{
		for( var key in window["playerObject"] )
		{
			if( window["playerObject"].hasOwnProperty(key) )
			{
				if( window["playerObject"][key].code == window["playerCode"] )
				{
					return window["playerObject"][key].xpos;
				}
			}
		}
	};
	
	ext.getPhoneY = function( playerName )
	{
		for( var key in window["playerObject"] )
		{
			if( window["playerObject"].hasOwnProperty(key) )
			{
				if( window["playerObject"][key].code == window["playerCode"] )
				{
					return window["playerObject"][key].ypos;
				}
			}
		}
	};

	var descriptor = {
		blocks: [
			['r', 'connection code', 'getConnCode',],
			['r', 'player %s network y', 'getPhoneX',],
			['r', 'player %s network y', 'getPhoneY',]
		]
	};

	ScratchExtensions.register('Communication +2', descriptor, ext);
})({});
