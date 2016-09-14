var button=document.getElementsByClassName('button');
var rootNode=document.getElementById('root');
var nodeList=[];
var index=0,timer=null,target=null,flag=0;
window.onload=function(){
    button[0].addEventListener('click',function(){
        nodeList=[];
        index=0;
        flag=0;
        target=null;
        BFTraverse(rootNode);
        renderTree(target);
        
    });
    button[1].addEventListener('click',function(){
        nodeList=[];
        target=null;
        flag=0;
        DFTraverse(rootNode);
        renderTree(target);
    });
    button[2].addEventListener('click',function(){
        nodeList=[];
        index=0;
        flag=0;
        BFTraverse(rootNode);
        target=document.getElementById('input').value;
        renderTree(target);

    });
    button[3].addEventListener('click',function(){
        nodeList=[];
        flag=0;
        DFTraverse(rootNode);
        target=document.getElementById('input').value;
        renderTree(target);
    });
}
function BFTraverse(node){
    if(node!==null){
        nodeList.push(node);

        //console.log(node.children.length);
        //console.log(node.childNodes.length);
        /*a1：children、childNodes 都是选取子元素节点，但childNodes会选取空白节点，所以推荐使用children；类似的有firstElementChild和firstChild，推荐使用firstElementChild，（firstElementChild不兼容IE678）*/

        BFTraverse(node.nextElementSibling);/*相邻的下一个节点*/
        node=nodeList[index++];
        // console.log(index);
        // console.log(nodeList);
        BFTraverse(node.firstElementChild);
    }
}

function DFTraverse(node){
    if(node!==null){
        nodeList.push(node);
        for(var i=0;i<node.children.length;i++){
            DFTraverse(node.children[i]);
        }
    }
}

function renderTree(target){
    resetColor();
    var i=0;
    console.log(target);
    
    nodeList[0].style.background='#64c333';

    timer=setInterval(function(){ 
        // console.log(nodeList[i].firstElementChild.nodeValue);

        if(target!==null){
            flag++;
            console.log(i);
            /*firstElementChild无法获得nodeValue，使用firstChild配合trim（）使用，去除末尾空白*/
            if(target===nodeList[i].firstChild.nodeValue.trim()){
                // nodelist[i].style.background='#64c333';
                clearInterval(timer);
                return;/*不再继续执行当前一次正在执行的定时器*/
            }  
            // console.log(nodeList.length); 
            // console.log(flag);
            if(flag===nodeList.length){
                alert("么有找到");
            } 
        }
        i++;
        if(i<nodeList.length){ 
            nodeList[i].style.background='#64c333';  
            nodeList[i-1].style.background='#fff';     
        }else{
            nodeList[i-1].style.background='#fff';
            clearInterval(timer);
        }   
    },500); 
    
}
    

function resetColor(){
    clearInterval(timer);
    for(var i=0;i<nodeList.length;i++){
        nodeList[i].style.background='#fff';
    }
}
