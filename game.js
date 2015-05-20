var dir = {
    left: 1,
    right: 2,
    up: 3,
    down: 4
};
speed = 10;

function turnpt(dir1, posx, posy) {
    this.posx = posx;
    this.posy = posy;
    this.dir1 = dir1;
    this.update = function (deltaT) {
        //alert('3.turning point update reached');
        if (this.dir1 == dir.right) this.posx = this.posx + speed * deltaT;
        else if (this.dir1 == dir.left) this.posx = this.posx - speed * deltaT;
        else if (this.dir1 == dir.down) this.posy = this.posy + speed * deltaT;
        else this.posy = this.posy - speed * deltaT;
    }
}
var busy = false;

function Snake() {
    this.length = 10;
    this.pts = [new turnpt(dir.right, this.length, 0), new turnpt(dir.right, 0, 0)];
    this.move = function (deltaT) {
        busy = true;
        //compute forces
        if (38 in keysDown) { // Player holding up
            this.creatept(dir.up);
        } else if (40 in keysDown) { // Player holding down
            this.creatept(dir.down);
        } else if (37 in keysDown) { // Player holding left
            this.creatept(dir.left);
        } else if (39 in keysDown) { // Player holding right
            this.creatept(dir.right);
        }
        //calculate positions
        this.pts[0].update(deltaT);
        this.pts[this.pts.length - 1].update(deltaT);
        //now check for tail point reduce
        if (this.pts.length > 2) {
            if (comparepos(this.pts[this.pts.length - 1], this.pts[this.pts.length - 2])) {
                this.pts.pop();
            }
        }
        busy = false;

    }
    var comparepos = function (pt1, pt2) {
        //pt1 = last;pt2 = last but one;
        if ((pt2.dir1 == dir.down || pt2.dir1 == dir.up) && pt1.dir1 == dir.right && pt1.posx > pt2.posx) return true;
        else if ((pt2.dir1 == dir.down || pt2.dir1 == dir.up) && pt1.dir1 == dir.left && pt1.posx < pt2.posx) return true;
        else if ((pt2.dir1 == dir.left || pt2.dir1 == dir.right) && pt1.dir1 == dir.up && pt1.posy < pt2.posy) return true;
        else if ((pt2.dir1 == dir.left || pt2.dir1 == dir.right) && pt1.dir1 == dir.down && pt1.posy > pt2.posy) return true;
        else return false;
    }
    this.creatept = function (dirpt) {
        if (dirpt == dir.up || dirpt == dir.down) {
            //see for validity
            if (this.pts[0].dir1 != dir.up && this.pts[0].dir1 != dir.down) {
                //alert('Inserting at next to head for '+dirpt);
                this.pts[0].dir1 = dirpt;
                this.pts.splice(1, 0, new turnpt(dirpt, this.pts[0].posx, this.pts[0].posy));
            }
        } else {
            if (this.pts[0].dir1 != dir.right && this.pts[0].dir1 != dir.left) {
                //alert('Inserting at next to head for '+dirpt);
                this.pts[0].dir1 = dirpt;
                this.pts.splice(1, 0, new turnpt(dirpt, this.pts[0].posx, this.pts[0].posy));
            }
        }
    }
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
document.body.appendChild(canvas);


var createdSnake = null;
var update = function (deltaT) {
    //alert('1.update reached');
    createdSnake.move(deltaT);
}

var render = function () {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(createdSnake.pts[0].posx * 10 + 5, createdSnake.pts[0].posy * 10 + 5);
    for (i = 1; i < createdSnake.pts.length; i++) {
        ctx.lineTo(createdSnake.pts[i].posx * 10 + 5, createdSnake.pts[i].posy * 10 + 5);
    }
    ctx.stroke();

    for (i in createdSnake.pts)
    ctx.fillRect(createdSnake.pts[i].posx * 10, createdSnake.pts[i].posy * 10, 10, 10);
}

var reset = function () {
    createdSnake = new Snake();
}

// Let's play
var main = function () {
    //The main game loop
    if (!busy) {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;
    }
    // Request to do this again ASAP
    requestAnimationFrame(main);

}


var then = Date.now();

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

reset();

main();
