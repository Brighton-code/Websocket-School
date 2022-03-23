const PORT = 8000;
const WebSocket = require('ws');

const wss = new WebSocket.Server({
	port: PORT,
	clientTracking: true,
});
console.log(`Listening on port: ${PORT}`);

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(data) {
		console.log(JSON.parse(`${data}`));
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(`${data}`);
			}
		});
	});
});
