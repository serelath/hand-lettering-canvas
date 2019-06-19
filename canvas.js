const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = 'hue(100%, 75%, 50%)';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;
ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

let points = [];


function draw(e) {
	if (!isDrawing) return;
	console.log(e);
	ctx.strokeStyle = `hsl(0, ${hue}, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	ctx.shadowBlur = 1;
	ctx.shadowColor = 'black';

	if (hue >= 360) {
		hue = 0;
	}

	var slope = ((lastY - e.offsetY) + 1) / (Math.abs(lastX - e.offsetX) + 1);

	if (slope < -0.5 ) {
		if (ctx.lineWidth < 15) {
			ctx.lineWidth++;
		}
	} else {
		if (ctx.lineWidth > 3) {
			ctx.lineWidth-= 1.5;
		}
	}
	console.log(slope);
	console.log(Math.abs(lastX - e.offsetX) + 1);

	[lastX, lastY] = [e.offsetX, e.offsetY];
	hue++;

//	points.push({
//		x: lastX,
//		y: lastY,
//		size: e.lineWidth,
//		color: e.strokeStyle,
//		mode: "draw"
//	});

}

canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
	ctx.lineWidth = 5;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
