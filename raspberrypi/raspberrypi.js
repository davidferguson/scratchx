piConnConnected = false;
piConnPersistent = true;
piConnKeepConnecting = 0;

function piConnConnect( ip )
{
	console.log("Connecting...");
	piConn = new WebSocket("ws://" + ip + ":7628/");
	piConn.onopen = function(evt) { onPiConnOpen(evt) };
	piConn.onclose = function(evt) { onPiConnClose(evt) };
	piConn.onmessage = function(evt) { onPiConnMessage(evt) };
	piConn.onerror = function(evt) { onPiConnError(evt) };
}
function onPiConnOpen(evt)
{
	piConnConnected = true;
}
function onPiConnError(evt)
{
	piConn.close();
}
function onPiConnClose(evt)
{
	piConn = false;
	if( piConnPersistent )
	{
		if( piConnKeepConnecting == 0 )
		{
			piConnKeepConnecting = setInterval(function()
			{
				if( piConnConnected )
				{
					clearInterval(piConnKeepConnecting);
					piConnKeepConnecting = 0;
				}
				else
				{
					piConnConnect();
				}
			}, 10000);
		}
	}
}

(function(ext)
{
	setTimeout(function()
	{
		loginBox = setInterval(function()
		{
			if( document.getElementById("modal-template-warning") == null )
			{
				clearInterval(loginBox);
				ipNumber = prompt("Please enter the number written on your Raspberry Pi's WiFi adapter.");
				if( ipNumber )
				{
					piConnConnect("192.168.5." + ipNumber);
				}
				else
				{
					alert("You didn't enter anything, so this won't work.");
				}
			}
		}, 10);
	}, 1000);
	
	ext._shutdown = function()
	{
		piConnPersistent = false;
		piConn.close();
	};
	ext._getStatus = function()
	{
		if (piConnConnected)
		{
			return {
				status: 2,
				msg: 'Ready'
			};
		}
		else
		{
			return {
				status: 1,
				msg: 'Connecting...'
			};
		}
	};
	ext.pinOn = function(pinNumber)
	{
		if (piConnConnected)
		{
			message = {
				action: "setpinstate",
				pin: pinNumber,
				state: 1,
				stateType: "binary"
			}
			message = JSON.stringify(message)
			piConn.send(message);
		}
	};
	ext.pinOff = function(pinNumber)
	{
		if (piConnConnected)
		{
			message = {
				action: "setpinstate",
				pin: pinNumber,
				state: 0,
				stateType: "binary"
			}
			message = JSON.stringify(message)
			piConn.send(message);
		}
	};
	var descriptor = {
		blocks: [
			[' ', 'Pin %n on', 'pinOn', 3],
			[' ', 'Pin %n off', 'pinOff', 3],
		]
	};
	ScratchExtensions.register('Raspberry Pi', descriptor, ext);
})({});
