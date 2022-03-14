const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();

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
	prevData = {
		X: e.clientX,
		Y: e.clientY,
	};
	mouseDown = true;
	context.beginPath();
	context.moveTo(prevData.X - rect.left, prevData.Y - rect.top);
});

canvas.addEventListener("mousemove", (e) => {
	// If mouse is down make a line form previous pos to new pos
	if (mouseDown) {
		context.beginPath();
		context.moveTo(prevData.X - rect.left, prevData.Y - rect.top);
		context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
		context.stroke();

		prevData = {
			X: e.clientX,
			Y: e.clientY,
		};
		// drawSelf(e, color);
	}
	// send prev and current data
});

canvas.addEventListener("mouseup", (e) => {
	mouseDown = false;
	context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
	context.stroke();
	// Send a single dot
});

canvas.addEventListener("mouseleave", (e) => {
	mouseDown = false;
});
