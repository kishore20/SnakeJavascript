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
        if(dirpt == dir.up)
        {
            //see for validity
            
            
        }
        else if(dirpt == dir.down)
        {
            
        }
        else if(dirpt == dir.left)
        {
            
        }
        else
        {
            
        }
        
    }
}
var pressed = false;
function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
 
	if (keyPressed == "W")
	{		
		
	}
	else if (keyPressed == "D")
	{	
				
	}
	else if (keyPressed == "S")
	{	
				
	}
	else if (keyPressed == "A")
	{	
				
	}
}
var pressed = false;
function keyDownHandler(event)
{
    pressed = true;
	var keyPressed = String.fromCharCode(event.keyCode);
 
	if (keyPressed == "W")
	{
        createdSnake.creatept(dir.up);
	}
	else if (keyPressed == "D")
	{	
				
	}
	else if (keyPressed == "S")
	{	
				
	}
	else if (keyPressed == "A")
	{	
				
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
