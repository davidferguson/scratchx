(function(ext)
{
	window["treeObject"] = "";
	$.ajax(
	{
		async:false,
		type:'GET',
		url:'https://cdn.firebase.com/js/client/2.2.4/firebase.js',
		data:null,
		success: function()
		{
			fb = new Firebase('https://christmastree.firebaseio.com');
			fb.on('value', function(snap)
			{
				window["treeObject"] = snap.val();
			});
		},
		dataType:'script'
	});
    
	ext._shutdown = function()
	{
		
	};

	ext._getStatus = function()
	{
		return {status: 2, msg: 'Ready'};
	};
	
	
	ext.getTreeStatus = function( )
	{
		return window["treeObject"].red;
	};
	
	ext.blueOn = function( )
	{
		fb.update({blue:true});
	};
	
	ext.blueOff = function( )
	{
		fb.update({blue:false});
	};
	
	ext.whiteOn = function( )
	{
		fb.update({white1:true});
	};
	
	ext.whiteOff = function( )
	{
		fb.update({white1:false});
	};

	ext.white2On = function( )
	{
		fb.update({white2:true});
	};
	
	ext.white2Off = function( )
	{
		fb.update({white2:false});
	};
	
	ext.multiOn = function( )
	{
		fb.update({multi1:true});
	};
	
	ext.multiOff = function( )
	{
		fb.update({multi1:false});
	};

	ext.multi2On = function( )
	{
		fb.update({multi2:true});
	};
	
	ext.multi2Off = function( )
	{
		fb.update({multi2:false});
	};

	var descriptor = {
		blocks: [
			[' ', 'blue on', 'blueOn'],
			[' ', 'blue off', 'blueOff',],
			[' ', 'white 1 on', 'whiteOn'],
			[' ', 'white 1 off', 'whiteOff',],
			[' ', 'white 2 on', 'white2On'],
			[' ', 'white 2 off', 'white2Off',],
			[' ', 'multi 1 on', 'multiOn'],
			[' ', 'multi 1 off', 'multiOff',],
			[' ', 'multi 2 on', 'multi2On'],
			[' ', 'multi 2 off', 'multi2Off',]
		]
	};

	ScratchExtensions.register('Christmas Tree Control', descriptor, ext);
})({});
