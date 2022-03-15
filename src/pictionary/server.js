const PORT = 3000;
const WebSocket = require("ws");

const wss = new WebSocket.Server({
	port: PORT,
	clientTracking: true,
});

// wss.on("connection", function connection(ws) {
// 	console.log(ws.user);
// 	ws.on("message", function incoming(data) {
// 		console.log(JSON.parse(`${data}`));
// 		wss.clients.forEach(function each(client) {
// 			if (client !== ws && client.readyState === WebSocket.OPEN) {
// 				client.send(`${data}`);
// 			}
// 		});
// 	});
// });
console.log(`Listening on port: ${PORT}`);
let playerID = 0;
let isDrawer = true;
wss.on("connection", (client) => {
	client.player = {
		id: (playerID += 1),
		drawer: isDrawer,
	};
	isDrawer = false;
	client.on("message", (data, isBinary) => {
		console.log(JSON.parse(`${data}`));

		wss.clients.forEach((user) => {
			if (user !== client && user.readyState === WebSocket.OPEN) {
				user.send(`${data}`);
			}
		});
	});
});
