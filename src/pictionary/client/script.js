const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
let ws;
function init() {
	if (ws) {
		ws.onerror = ws.onopen = ws.onclose = null;
		ws.close();
	}

	ws = new WebSocket("ws://localhost:3000");
	ws.onopen = () => {
		console.log("Connection opened!");
	};

	ws.onmessage = function ({ data }) {
		data = JSON.parse(data);
		console.log(data);
		draw(data);
	};

	ws.onclose = function () {
		ws = null;
	};
}

init();

// Drawing area and logic

let mouseDown = false;
let prevData = { X: 0, Y: 0 };
let color = "black";
let lineWidth = 5;

// Set context Styles
context.strokeStyle = color;
context.lineWidth = lineWidth;
context.lineCap = "round";

// Canvas Mouse EventListeners
canvas.addEventListener("mousedown", (e) => {
	context.beginPath();
	context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
	context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
	context.stroke();
	data = {
		startX: e.clientX - rect.left,
		startY: e.clientY - rect.top,
		endX: e.clientX - rect.left,
		endY: e.clientY - rect.top,
		color: color,
		lineWidth: lineWidth,
	};
	ws.send(JSON.stringify(data));
	prevData = {
		X: e.clientX,
		Y: e.clientY,
	};
	mouseDown = true;
});

canvas.addEventListener("mousemove", (e) => {
	// If mouse is down make a line form previous pos to new pos
	if (mouseDown) {
		context.beginPath();
		context.moveTo(prevData.X - rect.left, prevData.Y - rect.top);
		context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
		context.stroke();

		data = {
			startX: prevData.X - rect.left,
			startY: prevData.Y - rect.top,
			endX: e.clientX - rect.left,
			endY: e.clientY - rect.top,
			color: color,
			lineWidth: lineWidth,
		};
		ws.send(JSON.stringify(data));

		prevData = {
			X: e.clientX,
			Y: e.clientY,
		};
	}
	// send prev and current data
});

canvas.addEventListener("mouseup", (e) => {
	mouseDown = false;
});

canvas.addEventListener("mouseleave", (e) => {
	mouseDown = false;
});

function draw(data) {
	context.strokeStyle = data.color;
	context.lineWidth = data.lineWidth;

	context.beginPath();
	context.moveTo(data.startX, data.startY);
	context.lineTo(data.endX, data.endY);
	context.stroke();
}
