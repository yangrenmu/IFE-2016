var search=document.getElementById('search');
function TreeNode(obj){
    this.parent=obj.parent;
    this.childs=obj.childs||[];
    this.data=obj.data||"";
    this.selfElement=obj.selfElement;
    this.selfElement.TreeNode=this;
}
TreeNode.prototype={
    constructor:TreeNode,
    addChild:function(text){
        if(text===null)return this;
        text=text.trim();
        if(text===''){
            alert("要添加的节点内容不能为空");
            return this;
        }
        var length=this.childs.length;
        if(length!==0){
            var divNodeBody=this.childs[0].selfElement.className.indexOf('node-body');
            if(divNodeBody===-1){
                this.toggleFold();
            }
        }
        
        var nodeBody=document.createElement('div'),
            node=document.createElement('div'),
            arrow=document.createElement('div'),
            span=document.createElement('span'),
            addImg=document.createElement('img'),
            removeImg=document.createElement('img');
        nodeBody.className='node-body';
        node.className='node';
        arrow.className='arrow empty-arrow';
        addImg.className='image-add';
        removeImg.className='image-remove';
        span.innerHTML=text;
        addImg.src='img/add.png';
        removeImg.src='img/remove.png';
        nodeBody.appendChild(node);
        node.appendChild(arrow);
        node.appendChild(span);
        node.appendChild(addImg);
        node.appendChild(removeImg);
        // console.log(this);
        this.selfElement.appendChild(nodeBody);
        this.childs.push(new TreeNode({
            parent: this, 
            childs: [], 
            data: text, 
            selfElement: nodeBody
        }));
        this.render();
        return this;
    },
    render:function(){
        var length=this.childs.length;
        
        // console.log(length);
        if(length===0){
            this.selfElement.getElementsByClassName('arrow')[0].className="arrow empty-arrow";
        }else if(this.childs[0].selfElement.className.indexOf('node-body')===-1){
                this.selfElement.getElementsByClassName('arrow')[0].className="arrow right-arrow";
        }else{
            this.selfElement.getElementsByClassName('arrow')[0].className="arrow down-arrow";
        } 

    },
    toggleFold:function(){
        // if(this.childs.length===0)return this;
        // console.log(this);
        for(var i=0;i<this.childs.length;i++){
            if(this.childs[i].selfElement.className.indexOf('node-body')===-1){
                this.childs[i].selfElement.className='node-body';
            }else{
                
                this.childs[i].selfElement.className='node-hide';
            }
        }
        this.render();
        return this;
    },
    deleteNode:function(){
        // console.log(this.selfElement);
        this.parent.selfElement.removeChild(this.selfElement);
        for(var i=0;i<this.parent.childs.length;i++){
            this.parent.childs.splice(i,1);
            console.log(i);
            break;
        }
        this.parent.render();
    },
    /*广度搜索查询*/
    search:function(target){
        var queue=[];
        var result=[];
        var index=0;
        queue.push(this);
        var current=queue[index];

        while(current){
            current.selfElement.style.color='#00bc9b';
            if(current.data===target){
                result.push(current);
            }
            index++;
            for(var i=0,length=current.childs.length;i<length;i++){
                queue.push(current.childs[i]);
            }
            current=queue[index];
        }
        // for(var i=0;i<queue.length;i++){
        //     queue[i].selfElement.style.color='#00bc9b';
        // }   
        // console.log(result);
        return result;
    }
}
var root=new TreeNode({
    parent: null, 
    childs: [], 
    data: "目录", 
    selfElement: document.getElementsByClassName("node-body")[0]
});
window.onload=function(){

    addEvent(root.selfElement,'click',function(e){
        var target=e.target;/*选中点击的区域(有：div arrow、div node、span、img)*/
        var domNode=target;
        /*选中target的父节点*/
        while(domNode.className.indexOf('node-body')===-1){
            domNode=domNode.parentNode;
        }
        /*将target父节点转为对象*/
        selectedNode=domNode.TreeNode;
        // console.log(target);
        /*点击span时，展开*/
        if (target.tagName.indexOf("SPAN") !== -1) {
            selectedNode.toggleFold(); // 触发toggle操作

        }else if(target.className==='image-add'){
            selectedNode.addChild(prompt('请输入添加的节点内容'));
            root.search();/*初始化节点颜色*/
        }else if(target.className==='image-remove'){
            selectedNode.deleteNode();
        }

    });
    /*绑定点击和回车键*/
    addEvent(search,'click',searchClickKey);
    document.onkeydown=function(e){
        if(e.keyCode===13){
            searchClickKey();
        }
    }
}
function searchClickKey(){
    var text=document.getElementById('search-text').value;
    text=text.trim();
    if(text===''){
        alert('请输入要查询的内容');
        return;
    }
    var result=root.search(text);
    if(result.length===0){
        alert('没有该节点');
    }else{
        for(var i=0;i<result.length;i++){
            var searchNode=result[i];
            searchNode.selfElement.style.color='#ff0000';
            while(searchNode.parent){
                if(searchNode.selfElement.className==='node-hide'){
                    searchNode.parent.toggleFold();
                }
                searchNode=searchNode.parent;
            }
        }
    }  
}

function addEvent(element,type,handler){
    element.addEventListener(type,handler);
}

root.addChild('上午').addChild('下午').addChild('名著').toggleFold();
root.childs[0].addChild('看书').addChild('喝茶').addChild('看报纸').toggleFold();
root.childs[1].addChild('瓜子').addChild('花生').addChild('小板凳').toggleFold();
root.childs[2].addChild('基督山伯爵').addChild('飘').toggleFold();
root.childs[2].childs[1].addChild('瑞德').toggleFold();