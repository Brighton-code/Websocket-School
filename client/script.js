(function () {
  const sendBtn = document.querySelector("#send");
  const messages = document.querySelector("#messages");
  const messageBox = document.querySelector("#messageBox");

  let ws;

  function showMessage(message) {
    messages.textContent += `\n\n${message}`;
    messages.scrollTop = messages.scrollHeight;
    messageBox.value = "";
  }

  function init() {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket("ws://localhost:8000");
    ws.onopen = () => {
      console.log("Connection opened!");
    };

    ws.onmessage = function ({ data }) {
      showMessage(JSON.parse(data).message);
      console.log(JSON.parse(data));
    };

    ws.onclose = function () {
      ws = null;
    };
  }

  sendBtn.onclick = function () {
    if (!ws) {
      showMessage("No WebSocket connection :(");
      return;
    }

    ws.send(JSON.stringify({ message: `${messageBox.value}` }));
    showMessage(messageBox.value);
  };

  init();
})();
