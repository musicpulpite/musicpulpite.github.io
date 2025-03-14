document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setDimensions = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    };
    
    setDimensions();
    window.addEventListener('resize', setDimensions);
    
    // Mouse position tracking
    let mousePosition = { x: 0, y: 0 };
    
    window.addEventListener('mousemove', function(e) {
	mousePosition.x = e.clientX;
	mousePosition.y = e.clientY;
    });
    
    // Create points for the graph
    const createPoints = (width, height, count = 50) => {
	const points = [];
	for (let i = 0; i < count; i++) {
	    points.push({
		x: Math.random() * width,
		y: Math.random() * height,
		vx: Math.random() * 1 - 0.5,
		vy: Math.random() * 1 - 0.5,
		radius: Math.random() * 2 + 1
	    });
	}
	return points;
    };
    
    let points = createPoints(canvas.width, canvas.height);
    
    // Draw points and connections
    const drawPointsAndConnections = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#f8f9fa';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	const maxDistance = 200;
	
	points.forEach((point, i) => {
	    // Draw the point
	    ctx.beginPath();
	    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
	    ctx.fillStyle = '#3498db';
	    ctx.fill();
	    
	    // Calculate distance to mouse
	    const dx = mousePosition.x - point.x;
	    const dy = mousePosition.y - point.y;
	    const mouseDistance = Math.sqrt(dx * dx + dy * dy);
	    
	    // Connect to mouse if within range
	    if (mouseDistance < maxDistance) {
		ctx.beginPath();
		ctx.moveTo(point.x, point.y);
		ctx.lineTo(mousePosition.x, mousePosition.y);
		ctx.strokeStyle = `rgba(52, 152, 219, ${1 - mouseDistance / maxDistance})`;
		ctx.lineWidth = 0.5;
		ctx.stroke();
	    }
	    
	    // Connect to other points if within range
	    for (let j = i + 1; j < points.length; j++) {
		const pointB = points[j];
		const dxPoints = point.x - pointB.x;
		const dyPoints = point.y - pointB.y;
		const distance = Math.sqrt(dxPoints * dxPoints + dyPoints * dyPoints);
		
		if (distance < 100) {
		    ctx.beginPath();
		    ctx.moveTo(point.x, point.y);
		    ctx.lineTo(pointB.x, pointB.y);
		    ctx.strokeStyle = `rgba(52, 152, 219, ${1 - distance / 100})`;
		    ctx.lineWidth = 0.5;
		    ctx.stroke();
		}
	    }
	});
    };
    
    // Update point positions
    const updatePoints = () => {
	points.forEach(point => {
	    // Move points
	    point.x += point.vx;
	    point.y += point.vy;
	    
	    // Bounce off edges
	    if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
	    if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
	    
	    // Mouse attraction
	    const dx = mousePosition.x - point.x;
	    const dy = mousePosition.y - point.y;
	    const distance = Math.sqrt(dx * dx + dy * dy);
	    
	    if (distance < 300) {
		const force = 0.01;
		point.vx += (dx / distance) * force;
		point.vy += (dy / distance) * force;
	    }
	    
	    // Limit velocity
	    const maxVelocity = 2;
	    const velocity = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
	    if (velocity > maxVelocity) {
		point.vx = (point.vx / velocity) * maxVelocity;
		point.vy = (point.vy / velocity) * maxVelocity;
	    }
	});
    };
    
    // Animation loop
    const animate = () => {
	drawPointsAndConnections();
	updatePoints();
	requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
});
