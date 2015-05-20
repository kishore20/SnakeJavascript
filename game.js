enum dir {
    left, right, up, down
};

function turnpt(dir1, posx, posy) {
    this.speed = 20;
    this.posx = posx;
    this.posy = posy;
    this.dir1 = dir1;
    this.update = function (deltaT) {

        if (this.dir1 == dir.right) this.posx += speed * deltaT;
        else if (this.dir1 == dir.left) this.posx -= speed * deltaT;
        else if (this.dir1 == dir.down) this.posy += speed * deltaT;
        else this.posy -= speed * deltaT;
    }
}

function Snake() {
    this.pts = [new turnpt(dir.right, 50, 0), new turnpt(dir.right, 0, 0)];
    this.move = function (deltaT) {
        pts[0].update(deltaT);
        pts[pts.length - 1].update(deltaT);
        //now check for tail point reduce
        if (pts.length > 2) {
            if (comparepos(pts[pts.length - 1], pts[pts.length - 2])) {
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
ctx.fillStyle="#FF0000";
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
    createdSnake.update(deltaT);
}

var render = function () {
    for (pt in createdSnake.pts)
    ctx.fillRect(pt.posx * 10, pt.posy * 10, 10, 10);
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
