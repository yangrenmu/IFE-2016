var button=document.getElementsByClassName('button');
var rootNode=document.getElementById('root');
var divList=document.getElementById('wrap').getElementsByTagName('div');
var nodeList=[];
var index=0,timer=null,target=null,flag=0,deleteDiv=null;
window.onload=function(){
    button[0].addEventListener('click',function(){
        nodeList=[];
        deleteDiv=null;
        index=0;
        flag=0;
        target=null;
        BFTraverse(rootNode);
        renderTree(target);
        
    });
    button[1].addEventListener('click',function(){
        nodeList=[];
        deleteDiv=null;
        target=null;
        flag=0;
        DFTraverse(rootNode);
        renderTree(target);
    });
    button[2].addEventListener('click',function(){
        nodeList=[];
        deleteDiv=null;
        index=0;
        flag=0;
        BFTraverse(rootNode);
        target=document.getElementById('input').value;
        renderTree(target);

    });
    button[3].addEventListener('click',function(){
        nodeList=[];
        deleteDiv=null;
        flag=0;
        DFTraverse(rootNode);
        target=document.getElementById('input').value;
        renderTree(target);
    });

    //点击节点元素，改变背景颜色
    clickChangeColor();
    
    //删除选中的节点
    button[4].addEventListener('click',function(){
        // console.log(deleteDiv);
        if(deleteDiv===null){
            alert('请选择要删除的元素');
        }else{
            var parent=deleteDiv.parentNode;
            parent.removeChild(deleteDiv);
            deleteDiv=null;
        }
    });

    //添加节点
    button[5].addEventListener('click',function(){
        addNode();   
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
    // console.log(target);
    
    nodeList[0].style.background='#64c333';

    timer=setInterval(function(){ 
        // console.log(nodeList[i].firstElementChild.nodeValue);

        if(target!==null){
            flag++;
            target=target.trim();
            // console.log(i);
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
    for(var i=0;i<divList.length;i++){
        divList[i].style.background='#fff';
    }
}

function clickChangeColor(){
    console.log(divList.length);
    for(var i=0;i<divList.length;i++){
        divList[i].addEventListener('click',function(e){
            resetColor();
            this.style.background='#64c333';
            e.stopPropagation();
            deleteDiv=this;
        });
    }
}

function addNode(){
    var text=document.getElementById('addNode').value;
        text=text.trim();
        if(text===''){
            alert('请输入要输入的节点内容');
        }else if(deleteDiv===null){
            alert('请选择要添加到的节点');
        }else{
            var newDiv=document.createElement('div');
            newDiv.innerHTML=text;
            deleteDiv.appendChild(newDiv);
            newDiv.style.display='flex';
            resetColor();
            clickChangeColor();
        }
}

