(function(ext)
{
	websocket = new WebSocket("ws://10.103.248.20:8000");
	websocket.onopen = function(evt) { onOpen(evt) };
	websocket.onclose = function(evt) { onClose(evt) };
	websocket.onmessage = function(evt) { onMessage(evt.data) };
	websocket.onerror = function(evt) { onError(evt) };
	
	function onOpen()
	{
		console.log("Websocket opened");
	}
	function onClose()
	{
		console.log("Websocket closed");
	}
	function onMessage(message)
	{
		console.log("Received " + message + " from tree");
	}
	function onError()
	{
		console.log("Websocket error");
		websocket.close();
	}
	
	ext._shutdown = function()
	{
		websocket.close();
	};

	ext._getStatus = function()
	{
		return {status: 2, msg: 'Ready'};
	};
	
	
	ext.blueOn = function( )
	{
		websocket.send(JSON.stringify({action:"on",color:"blue"}));
	};
	
	ext.blueOff = function( )
	{
		websocket.send(JSON.stringify({action:"off",color:"blue"}));
	};
	
	ext.whiteOn = function( )
	{
		websocket.send(JSON.stringify({action:"on",color:"white"}));
	};
	
	ext.whiteOff = function( )
	{
		websocket.send(JSON.stringify({action:"off",color:"white"}));
	};

	ext.white2On = function( )
	{
		websocket.send(JSON.stringify({action:"on",color:"white2"}));
	};
	
	ext.white2Off = function( )
	{
		websocket.send(JSON.stringify({action:"off",color:"white2"}));
	};
	
	ext.multiOn = function( )
	{
		websocket.send(JSON.stringify({action:"on",color:"multi"}));
	};
	
	ext.multiOff = function( )
	{
		websocket.send(JSON.stringify({action:"off",color:"multi"}));
	};

	ext.multi2On = function( )
	{
		websocket.send(JSON.stringify({action:"on",color:"multi2"}));
	};
	
	ext.multi2Off = function( )
	{
		websocket.send(JSON.stringify({action:"off",color:"multi2"}));
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
