//canvas
var canvas = new fabric.Canvas('canvas',{
    width:900,
    height:400
})
canvas.renderAll();


//image upload
document.getElementById('uploadbtn').addEventListener('change', function(obj){
    var fileOrigin = obj.target.files[0];
    var reader = new FileReader();
    reader.onload=function(file){
        var fileData = file.target.result;
        fabric.Image.fromURL(fileData, function(obj){
            var newImg = obj.set({
                left:100, top:100
            });
            canvas.add(newImg).renderAll();
            // var a = canvas.setActiveObject(newImg);
            // var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
        });
    };
   reader.readAsDataURL(fileOrigin);
})


  
//line

var activate = document.getElementById('activate');
let line;
activate.addEventListener('click',drawLine);
let flag=false;


function drawLine(){ 
    canvas.on('mouse:down',switchOn);
    canvas.on('mouse:move',switchDraw);
    canvas.on('mouse:up',switchOff);
    canvas.selection=false;
    canvas.hoverCursor= 'auto';    
}

function switchOn(){
    let pointer = canvas.getPointer(this.e);
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y],{
        id:'canvas-lines',
        stroke: color,
        strokeWidth:2,
        selectable:false
    });
    canvas.add(line);
    canvas.requestRenderAll();
    flag=true;
}
function switchDraw(){
    if(flag===true){
        let pointer = canvas.getPointer(this.e);
    line.set({
        x2: pointer.x,
        y2: pointer.y
    });
    canvas.add(line);
    canvas.requestRenderAll();
    }
}
function switchOff(){
    flag = false;
    line.setCoords();
}
//line deactive
var deactivate = document.getElementById('deactivate');
deactivate.addEventListener('click',stopDrawLine);

function stopDrawLine(){
    canvas.off('mouse:down',switchOn);
    canvas.off('mouse:move',switchDraw);
    canvas.off('mouse:up',switchOff);

    canvas.getObjects().forEach( o=> {
        if(o.id==='canvas-lines'){
            o.set({
                selectable:true
            })
        }
    })
}

//rectangle
function drawRect(){
    canvas.on('mouse:down',RectOn);
    canvas.on('mouse:move',RectDraw);
    canvas.on('mouse:up',RectOff);
}
var fLeft = 0;
var fTop = 0;
let rectFlag = false;
//mouse click (draw rectangle)
const RectOn=()=>{
    rectFlag = true;
    let pointer = canvas.getPointer(this.e);
    fLeft = pointer.x;  
    fTop = pointer.y;
    var rect = new fabric.Rect({
        id: 'canvas-rect',
        selectable: false,
        left: pointer.x,
        top: pointer.y,
        fill: color,
        width: 1,
        height: 1
    });
    canvas.add(rect);
    canvas.requestRenderAll();
    canvas.setActiveObject(rect);
}

//mouse move (draw rectangle)
const RectDraw=()=>{
    if(rectFlag===true){
        let pointer = canvas.getPointer(this.e);
        var nLeft = Math.min(fLeft, pointer.x);
        var nTop = Math.min(fTop, pointer.y);
        var nWidth = Math.abs(pointer.x - fLeft);
        var nHeight = Math.abs(pointer.y - fTop);
        if (!nWidth || !nHeight) {

            return false;
    
        }
        var item = canvas.getActiveObject();
        item.set('left', nLeft).set('top', nTop).set('width', nWidth).set('height', nHeight);
        canvas.renderAll();
    }
}
//mouse remove click(draw rectangle)
const RectOff=()=>{
    if(rectFlag){
        rectFlag = false;
    }
}
//rectangle active button
var rectBtn = document.getElementById('rect');
rect.addEventListener('click', activeRect);

function activeRect(){
    drawRect();
}
//rectangle deactive button
const stopRect=()=>{
    canvas.off('mouse:down',RectOn);
    canvas.off('mouse:move',RectDraw);
    canvas.off('mouse:up',RectOff);
    canvas.getObjects().forEach((o)=>{
        if(o.id==='canvas-rect'){
            o.set({
                selectable:true
            })
        }
    })
}


//changeColor
var color = '#000000FF';
colorPicker=()=>{
    var colorbx = document.getElementById('colorbx');
    colorbx.addEventListener('change',(event)=>{
        color = event.target.value;
    })
}
colorPicker();


//clearAll
var clear = document.getElementById('clearAll');
const clearAll=(canvas)=>{
    canvas.clear();
    canvas.renderAll();
}

deleteItem=()=>{
    var item = canvas.getActiveObject();
    canvas.remove(item);
    console.log('click');
}