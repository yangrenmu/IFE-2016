var tagInput=document.getElementById('tag-input');
var tagShow=document.getElementById('tag-show');
var textArea=document.getElementById('textarea');
var textShow=document.getElementById('text-show');
var textButton=document.getElementById('button');

var tagObj=new creatList(tagShow);
var textObj=new creatList(textShow);

function creatList(input){
    this.queue=[];
    this.render=function(){
        var str='';      
        for(var i=0;i<this.queue.length;i++){
            console.log(this.queue[i]);
            if(typeof(this.queue[i])!=='undefined'){
                str+='<li id="li-'+i+'">'+this.queue[i]+'</li>'; 
            }    
        }      
        input.innerHTML=str;    
    }
}
creatList.prototype.inputSplit=function(str){
    var data=[];
    str=str.trim().split(/[^0-9A-z\u4e00-\u9fa5]+/).filter(function(e){
            return e!=='';
        })
    for(var i=0;i<str.length;i++){
        data.push(str[i]);
    }
    return data;
}
creatList.prototype.rightPush=function(str){
    this.queue.push(str);
}
creatList.prototype.leftOut=function(str){
    this.queue.splice(0,1);
}
function addEvent(ul,event,data){
    ul.addEventListener(event,function(e){
        var li=e.target;
        data.queue.splice(li.getAttribute('id').substr(3),1);
        data.render();
        console.log(data);
    });
}
tagInput.onkeyup=updateTag;
addEvent(tagShow,'click',tagObj);/*添加点击删除事件*/
addEvent(textShow,'click',textObj);
function updateTag(e){
    e=window.event||e;
    if(/[，, ]+/.test(this.value)||e.keyCode==13){
        var tagData=tagObj.inputSplit(this.value)[0];
        this.value='';
        if(tagObj.queue.indexOf(tagData)===-1){
            tagObj.rightPush(tagData);
        }
        if(tagObj.queue.length>10){
            tagObj.leftOut(tagData);
        }       
        tagObj.render();        
    }
}
textButton.addEventListener('click',function(){
    var textData=textObj.inputSplit(textArea.value);
    for(var i=0;i<textData.length;i++){
        if(textObj.queue.indexOf(textData[i])===-1){
            textObj.rightPush(textData[i]);
        }
    }
    if(textObj.queue.length>10){
        var length=textObj.queue.length-10;
        for(i=0;i<length;i++){
            textObj.leftOut(textData[i]);
        }    
    }
    textObj.render();
    console.log(textData);
});