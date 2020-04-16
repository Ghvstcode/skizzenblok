const getSketch = (x,y) => {
    console.log(x)
    y.mode = x.mode;
    y.weight = x.weight;
    y.smoothing = x.smoothing;
    y.color = x.color;
    y.adaptiveStroke = x.adaptiveStroke;

    const points = x.points.slice();

    const firstPoint = points.shift();

    y.beginStroke(firstPoint.x, firstPoint.y);

    let prevPoint = firstPoint;
    while (points.length > 0) {
        const point = points.shift();

        const { x, y } = y.draw(point.x, point.y, prevPoint.x, prevPoint.y);


        prevPoint = { x, y };
        strokeOff()
    }
      strokeOn()
}

module.exports = {
    getSketch
}