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
	
	ext.treeOn = function( )
	{
		fb.update({red:true});
	};
	
	ext.treeOff = function( )
	{
		fb.update({red:false});
	};

	var descriptor = {
		blocks: [
			['r', 'tree status', 'getTreeStatus',],
			[' ', 'turn tree on', 'treeOn'],
			[' ', 'turn tree off', 'treeOff',]
		]
	};

	ScratchExtensions.register('Christmas Tree Control', descriptor, ext);
})({});
