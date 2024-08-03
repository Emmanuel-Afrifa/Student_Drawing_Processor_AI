// Creating the Sketchpad class

class SketchPad {
    constructor(container, size = 400){
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color:  white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas);

        // Adding a line break
        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak)

        // Adding UNDO button
        this.undoButton = document.createElement("button");
        this.undoButton.innerHTML = "UNDO";
        container.appendChild(this.undoButton);

        // To enable us draw on the canvas
        this.ctx = this.canvas.getContext("2d");

        this.reset();

        // Adding an event listener to detect mouse actions
        this.#addEventListeners();
    }

    reset(){
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }

    #addEventListeners(){
        this.canvas.onmousedown = (event) => {
            const mouseCoordinate = this.#getMouseLocation(event);
            this.paths.push([mouseCoordinate]);
            this.isDrawing = true;
        }

        // on mouse move 
        this.canvas.onmousemove = (event) => {
            if (this.isDrawing){
                const mouseCoordinate = this.#getMouseLocation(event);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouseCoordinate);
                this.#redraw();

            }
        }

        // on mouse up
        document.onmouseup = () => {
            this.isDrawing = false;
        }

        // Adding event listeners for touches
        this.canvas.ontouchstart =  (event) => {
            const location = event.touches[0];
            this.canvas.onmousedown(location);
        }

        // Adding event listener for touch moving
        this.canvas.ontouchmove = (event) => {
            const location = event.touches[0];
            this.canvas.onmouseup(location);
        }

        // Adding event listener for touch end
        document.ontouchend = () => {
            documentx.onmouseup();
        }

        // Adding an event listener to the undo button
        this.undoButton.onclick = (event) => {
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw() {
        // Clearing the canvas
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);

        // Enabling and disabling the undo button
        if (this.paths.length > 0){
            this.undoButton.disabled = false;
        } else {
            this.undoButton.disabled = true;
        }
    }


    #getMouseLocation = (event) => {
        const rectangularBox = this.canvas.getBoundingClientRect();
        return [
            Math.round(event.clientX - rectangularBox.left),
            Math.round(event.clientY - rectangularBox.top)
        ];
    }
    
    
}

// Accessing DOM elements
// const sketchPadContainer = document.getElementById("sketch-pad-container")

// const sketchPad = new SketchPad(sketchPadContainer);