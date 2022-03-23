const PORT = 3000;
const WebSocket = require('ws');

const wss = new WebSocket.Server({
	port: PORT,
	clientTracking: true,
});

console.log(`Listening on port: ${PORT}`);

const clients = new Map();

wss.on('connection', (ws) => {
	const id = uuidv4();
	const metaData = { id };
	clients.set(ws, metaData);
	ws.on('message', (data, isBinary) => {
		const pData = JSON.parse(`${data}`);
		console.log(pData);

		wss.clients.forEach((user) => {
			if (user !== ws && user.readyState === WebSocket.OPEN) {
				user.send(`${data}`);
			}
		});
	});
});

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
}
