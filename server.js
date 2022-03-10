const PORT = 8000;
const WebSocket = require("ws");

const wss = new WebSocket.Server({
  port: PORT,
  clientTracking: true,
});

wss.on("connection", function connection(ws) {
  ws.user = {
    userData: {
      name: "Brighton",
      nickName: "TheHyper",
    },
    UUID: "0002-2218",
  };
  console.log(ws.user);
  ws.on("message", function incoming(data) {
    console.log(JSON.parse(`${data}`));
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`${data}`);
      }
    });
  });
});
