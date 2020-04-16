const socket = io()
const canvas = document.querySelector('#sketchpad');
const sketchpad = new Atrament(canvas);
sketchpad.smoothing = 1.3;

//I Guess there are more elegant ways to do this, if you know of any you could make a Pull Request
let color = ""

document.querySelector('#green').addEventListener('click', ()=> {
    color = 'green';
})
document.querySelector('#blue').addEventListener('click', ()=> {
    color = 'blue';
})
document.querySelector('#orange').addEventListener('click', ()=> {
    color = 'orange';
})
document.querySelector('#yellow').addEventListener('click', ()=> {
    color = 'yellow';
})
document.querySelector('#purple').addEventListener('click', ()=> {
    color = 'purple';
})
document.querySelector('#amber').addEventListener('click', ()=> {
    color = '#FFBF00';
})
document.querySelector('#teal').addEventListener('click', ()=> {
    color = '#008080';
})
document.querySelector('#gray').addEventListener('click', ()=> {
    color = 'gray';
})
document.querySelector('#lime').addEventListener('click', ()=> {
    color = '#00FF00';
})
document.querySelector('#cyan').addEventListener('click', ()=> {
    color = '#00FFFF';
})
document.querySelector('#indigo').addEventListener('click', ()=> {
    color = '#4b0082';
})
document.querySelector('#khaki').addEventListener('click', ()=> {
    color = '#3cb091';
})

const strokeOn = () => {
    sketchpad.recordStrokes = true
}
strokeOn()

const strokeOff = () => {
    sketchpad.recordStrokes = false
}

let strokePattern = []

sketchpad.addEventListener('strokerecorded', ({ stroke }) => {
    stroke.color = color;
    const sketch = stroke
    strokePattern.push(sketch)
    socket.emit('sketch', sketch, (error) => {
        if (error) {
            return console.log(error)
        }
    })   
    strokeOff()
});

//sketchpad.addEventListener('dirty', () => console.info(sketchpad.isDirty));

const sleep = async time => new Promise((r) => setTimeout(r, time))

socket.on('resketch', async (sketch)=> {
    const resketch = sketch.color
    sketchpad.mode = sketch.mode;
    sketchpad.weight = sketch.weight;
    sketchpad.smoothing = sketch.smoothing;
    sketchpad.color = resketch
    sketchpad.adaptiveStroke = sketch.adaptiveStroke;

    const points = sketch.points.slice();

    const firstPoint = points.shift();

    sketchpad.beginStroke(firstPoint.x, firstPoint.y);

    let prevPoint = firstPoint;
    while (points.length > 0) {
        const point = points.shift();

        const { x, y } = sketchpad.draw(point.x, point.y, prevPoint.x, prevPoint.y, color);

        prevPoint = { x, y };
        strokeOff()
    }
      strokeOn()
})


socket.emit('join', (error)=> {
    if(error) {
        alert(error)

        location.href='/'
    }
})

socket.on('message', (message)=> {
 alert(message.text)
})



