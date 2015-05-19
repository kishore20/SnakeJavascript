enum dir {left, right, up, down};
function turnpt(dir1, posx, posy)
{
    this.posx = posx;         
    this.posy = posy;
    this.dir1 = dir1;    
    this.front = dir.right;
    this.rear = dir.right;
    this.update = function(){
        if(this.dir1 == dir.right)
        this.posx++;
        else if(this.dir1 == dir.left)
        this.posx--;
        else if(this.dir1 == dir.down)
        this.posy++;
        else
        this.posy--;
    }
}

function Snake()
{
    this.pts = [new turnpt(dir.right, 50, 0), new turnpt(dir.right, 0, 0)];
    this.move = function()
    {
     pts[0].update();
     pts[pts.length - 1].update();
     //now check for tail point reduce
     if(pts.length>2)
     {
         if(comparepos(pts[pts.length - 1],pts[pts.length - 2]))
         {
             this.pts.slice(1,this.pts.length-1);
         }
     }
        
    }    
    this.comparepos = function(pt1, pt2)
    {
        if(pt1.posx==pt2.posx && pt1.posy==pt2.posy)
            return true;
        else
            return false;
    }
    this.creatept = function(dirpt)
    {
        if(dirpt == dir.up || dirpt == dir.down)
        {
            //see for validity
            if(pts[0].dir1 != dir.up || pts[0].dir1 != dir.down)
            pts.splice(1,0,new turnpt(dirpt, pts[0].x, pts[0].y));            
        }
        else
        {
            if(pts[0].dir1 != dir.right || pts[0].dir1 != dir.left)
            pts.splice(1,0,new turnpt(dirpt, pts[0].x, pts[0].y));            
        }        
    }
}

var pressed = false;

function keyDownHandler(event)
{
    if(pressed == false)
    {
    pressed = true;
	var keyPressed = String.fromCharCode(event.keyCode);
 
	if (keyPressed == "W")
	{
        createdSnake.creatept(dir.up);
	}
	else if (keyPressed == "D")
	{	
        createdSnake.creatept(dir.right);				
	}
	else if (keyPressed == "S")
	{	
        createdSnake.creatept(dir.down);				
	}
	else if (keyPressed == "A")
	{	
        createdSnake.creatept(dir.left);				
	}
    }
}
function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	
	if ((keyPressed == "W") || (keyPressed == "A") || 
		(keyPressed == "S") || (keyPressed == "D"))
	{
		pressed = false;
	}
}
