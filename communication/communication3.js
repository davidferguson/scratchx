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
			fb = new Firebase('https://scratchmulti.firebaseio.com');
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
	
	ext.setNetName = function( newNetName )
	{
		var found = false;
		if( window["netName"] == undefined )
		{
			window["netName"] = newNetName;
			for( var key in window["playerObject"] )
			{
				if( window["playerObject"].hasOwnProperty(key) )
				{
					if( window["playerObject"][key].name == window["netName"] )
					{
						found = true;
					}
				}
			}
			if( ! found )
			{
				fb.child('players').push({ 'name': newNetName, 'xpos': '0', 'ypos': '0', 'score': '0' });
			}
		}
		else
		{
			alert("You have already set your network name. You can't change this.");
		}
	};
	
	ext.setNetLocation = function( x, y )
	{
		for( var key in window["playerObject"] )
		{
			if( window["playerObject"].hasOwnProperty(key) )
			{
				if( window["playerObject"][key].name == window["netName"] )
				{
					fb.child('players').child(key).update({ 'xpos': x, 'ypos': y });
				}
			}
		}
	};
	
	ext.getPlayerX = function( playerName )
	{
		for( var key in window["playerObject"] )
		{
			if( window["playerObject"].hasOwnProperty(key) )
			{
				if( window["playerObject"][key].name == playerName )
				{
					return window["playerObject"][key].xpos;
				}
			}
		}
	};
	
	ext.getPlayerY = function( playerName )
	{
		for( var key in window["playerObject"] )
		{
			if( window["playerObject"].hasOwnProperty(key) )
			{
				if( window["playerObject"][key].name == playerName )
				{
					return window["playerObject"][key].ypos;
				}
			}
		}
	};
	
	ext.getPlayerScore = function( playerName )
	{
		for( var key in window["playerObject"] )
		{
			if( window["playerObject"].hasOwnProperty(key) )
			{
				if( window["playerObject"][key].name == playerName )
				{
					return window["playerObject"][key].score;
				}
			}
		}
	};

	var descriptor = {
		blocks: [
			[' ', 'set network name %s', 'setNetName'],
			[' ', 'set network location x:%n y:%n', 'setNetLocation'],
			['r', 'player %s network x', 'getPlayerX',],
			['r', 'player %s network y', 'getPlayerY',],
			['r', 'player %s network score', 'getPlayerScore',]
		]
	};

	ScratchExtensions.register('Communication +2', descriptor, ext);
})({});
