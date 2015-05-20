var dir = {
    left: 1,
    right: 2,
    up: 3,
    down: 4
};
speed = 5;

function turnpt(dir1, posx, posy) {
    this.posx = posx;
    this.posy = posy;
    this.dir1 = dir1;
    this.update = function (deltaT) {
        //alert('3.turning point update reached');
        if (this.dir1 == dir.right) this.posx = this.posx + speed * deltaT;
        else if (this.dir1 == dir.left) this.posx = this.posx + speed * deltaT;
        else if (this.dir1 == dir.down) this.posy = this.posy + speed * deltaT;
        else this.posy = this.posy + speed * deltaT;
    }
}

function Snake() {
    this.pts = [new turnpt(dir.right, 5, 0), new turnpt(dir.right, 0, 0)];
    this.move = function (deltaT) {
        //alert('2.move reached');
        this.pts[0].update(deltaT);
        this.pts[this.pts.length - 1].update(deltaT);
        //now check for tail point reduce
        if (this.pts.length > 2) {
            //alert('check for redundancy');
            if (comparepos(this.pts[this.pts.length - 1], this.pts[this.pts.length - 2])) {
                this.pts.slice(1, this.pts.length - 1);
            }
        }

    }
    this.comparepos = function (pt1, pt2) {
        if (pt1.posx == pt2.posx && pt1.posy == pt2.posy) return true;
        else return false;
    }
    this.creatept = function (dirpt) {
        if (dirpt == dir.up || dirpt == dir.down) {
            //see for validity
            if (pts[0].dir1 != dir.up || pts[0].dir1 != dir.down) {
                pts[0].dir1 = dirpt;
                pts.splice(1, 0, new turnpt(dirpt, pts[0].x, pts[0].y));
            }
        } else {
            if (pts[0].dir1 != dir.right || pts[0].dir1 != dir.left) {
                pts[0].dir1 = dirpt;
                pts.splice(1, 0, new turnpt(dirpt, pts[0].x, pts[0].y));
            }
        }
    }
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
var pressed = false;

function keyDownHandler(event) {
    if (pressed == false) {
        pressed = true;
        var keyPressed = String.fromCharCode(event.keyCode);

        if (keyPressed == "W") {
            createdSnake.creatept(dir.up);
        } else if (keyPressed == "D") {
            createdSnake.creatept(dir.right);
        } else if (keyPressed == "S") {
            createdSnake.creatept(dir.down);
        } else if (keyPressed == "A") {
            createdSnake.creatept(dir.left);
        }
    }
}

function keyUpHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    if ((keyPressed == "W") || (keyPressed == "A") || (keyPressed == "S") || (keyPressed == "D")) {
        pressed = false;
    }
}

var createdSnake = null;
var update = function (deltaT) {
    //alert('1.update reached');
    createdSnake.move(deltaT);
}

var render = function () {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i in createdSnake.pts)
    //alert('4.render points reached');
    ctx.fillRect(createdSnake.pts[i].posx * 10, createdSnake.pts[i].posy * 10, 10, 10);
}

var reset = function () {
    createdSnake = new Snake();
}

// Let's play
var main = function () {
    //The main game loop
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);

}


var then = Date.now();
reset();
main();
