trianglesConfig = {
	get clientWidth() { return document.body.clientWidth },
	get clientHeight() { return document.body.clientHeight },
	density: 11 // bigger than 1
}

mina.easeOutQuad = function(n) {
		return -1 * n * ( n - 2 );
};

class Triangles {

	constructor() {
		this.paper = new Snap('#triangles-background');
		this.triangleArr = [];
		this.generateTriangles();
	}

	// Helper function to determine if a point is far enough to all the other points in an array
	checkDistance(origin, ptArr) {
		if (ptArr.length === 0) {
			return true;
		}
		for (let i=0; i<ptArr.length; i++) {
			let distance = Math.sqrt(Math.pow(origin[0] - ptArr[i][0], 2) + Math.pow(origin[1] - ptArr[i][1], 2));
			if (distance < 1 / trianglesConfig.density) {
				return false;
			}
		}
		return true;
	}

	// generate an array of points
	generateRandomPoints() {
		let ptArr = [];
		let count = 0;
		let stop = false;
		// if count is bigger than 100 i assume the program cannot find another point
		while(!stop) {
			let x, y;
			// generate points that are of appropriate distance apart
			count = 0;
			do {
				count++;
				if (count > 1000) {
					console.log('over 1000')
					stop = true;
				}
				x = Math.random();
				y = Math.random();
			} while (!this.checkDistance([x,y], ptArr) && !stop);
			ptArr.push([x, y]);
		}

		return ptArr.map(pt => [(pt[0] - 0.25) * trianglesConfig.clientWidth * 1.5, (pt[1] - 0.25) * trianglesConfig.clientHeight * 1.75]);
	}
	
	generateTriangles() {
		this.clear();
		let randomPoints = this.generateRandomPoints();
		let trianglePoints = Delaunay.triangulate(randomPoints);
		for (let i=2; i<trianglePoints.length; i+=3) {
			let vertices = [randomPoints[trianglePoints[i]], randomPoints[trianglePoints[i-1]], randomPoints[trianglePoints[i-2]]];
			let newTriangle = this.paper.polygon(vertices)
			.attr({
				strokeWidth: 1,
				stroke: '#fff',
				fill: '#254E70'
			});
			this.triangleArr.push({
				svgEl: newTriangle,
				// calculate the centriod of the triangle
				center: [(vertices[0][0] + vertices[1][0] + vertices[2][0]) / 3, (vertices[0][1] + vertices[1][1] + vertices[2][1]) / 3], 
			});
		}
		
		this.animateOut(0);
	}

	clear() {
		this.paper.clear();
		this.triangleArr = [];
	}
	
	animateIn(time) {
		return new Promise((res, rej) => {
			this.triangleArr.forEach((triangle) => {
				triangle.svgEl.animate(
					{
						opacity: 1,
						transform: 't0,0'
					},
					time,
					mina.easeOutQuad,
					res
				);
			});
		});
	}
	
	animateOut(time) {
		return new Promise((res, rej) => {
			this.triangleArr.forEach((triangle) => {
				let clientCenter = [trianglesConfig.clientWidth / 2, trianglesConfig.clientHeight / 2];
				let xOffset = clientCenter[0] - triangle.center[0];
				let yOffset = clientCenter[1] - triangle.center[1];
				triangle.svgEl.animate(
					{
						opacity: 0,
						transform: 't' + (-xOffset) * 3 +',' + (-yOffset) * 3
					},
					time,
					mina.easeOutQuad,
					res
				);
			});
		});
	}
}

let triangleOverlay = new Triangles();

let out = true;
triangleOverlay.paper.click(() => {
	if (!out) {
		console.log('animate out');
		triangleOverlay.animateOut(600).then(() => {
			if (out) {
				triangleOverlay.generateTriangles()
			}
		});
	} else {
		console.log('animate in');
		triangleOverlay.animateIn(600);
	}
	out = !out;
})
