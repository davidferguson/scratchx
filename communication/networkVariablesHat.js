(function(ext)
{
	window["oldNetVariables"] = "";
	$.ajax(
	{
		async:false,
		type:'GET',
		url:'https://cdn.firebase.com/js/client/2.2.4/firebase.js',
		data:null,
		success: function()
		{
			fb = new Firebase('https://networkscratch.firebaseio.com');
			fb.child('variables').on('value', function(snap)
			{
				window["netVariables"] = snap.val();
			});
		},
		dataType:'script'
	});
    
	ext._shutdown = function() {};

	ext._getStatus = function()
	{
		return {status: 2, msg: 'Ready'};
	};
	
	ext.setNetworkVariable = function( netVarName, netVarValue )
	{
		window["netVariables"][netVarName] = netVarValue;
		fb.child('variables').update(window["netVariables"]);
	};
	
	ext.getNetworkVariable = function( netVarName )
	{
		return window["netVariables"][netVarName]
	};
	
	ext.onVariableChange = function( netVarName )
	{
		if( window["oldNetVariables"] != window["netVariables"] )
		{
			window["oldNetVariables"] = window["netVariables"];
			return true;
		}
		return false;
	}

	var descriptor = {
		blocks: [
			['h', 'when network variable %s changed', 'onVariableChange'],
			[' ', 'set network variable %s to %s', 'setNetworkVariable'],
			['r', '%s network variable value', 'getNetworkVariable',],
		]
	};

	ScratchExtensions.register('Network Variables', descriptor, ext);
})({});
