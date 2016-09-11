var button=document.getElementsByTagName('input'),
    treeRoot=document.getElementById('wrap'),
    timer=null;
    tree=[];
window.onload=function(){
    button[0].addEventListener('click',function(){
        tree=[];
        /*改变选中的按钮颜色，恢复其他按钮背景颜色*/
        button[0].style.background='#64c333';
        button[1].style.background='#00bc9b';
        button[2].style.background='#00bc9b';
        preOrder(treeRoot);/*前序遍历*/
        changeColor();  /*改变背景颜色*/     
    });
    button[1].addEventListener('click',function(){
        tree=[];
        button[0].style.background='#00bc9b';
        button[1].style.background='#64c333';
        button[2].style.background='#00bc9b';
        inOrder(treeRoot);
        changeColor();  
    });
    button[2].addEventListener('click',function(){
        tree=[];
        button[0].style.background='#00bc9b';
        button[1].style.background='#00bc9b';
        button[2].style.background='#64c333';
        postOrder(treeRoot); 
        changeColor(); 
    });
}
function preOrder(node){    
    if(node!==null){
        /*节点进栈顺序：根-左-右*/
        tree.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}
function inOrder(node){    
    if(node!==null){
        /*节点进栈顺序：左-根-右*/
        inOrder(node.firstElementChild);
        tree.push(node);
        inOrder(node.lastElementChild);
    }
}
function postOrder(node){    
    if(node!==null){
        /*节点进栈顺序：左-右-根*/
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        tree.push(node);
    }
}
function changeColor(){
    resetColor();/*清除定时器，初始化节点背景颜色*/
    var i=0;
    tree[0].style.background='#64c333';
    /*按遍历顺序改变节点背景颜色*/
    timer=setInterval(function(){
        i++;
        if(i<tree.length){
            tree[i].style.background='#64c333';
            tree[i-1].style.background='#fff';
        }else{
            tree[i-1].style.background='#fff';
            clearInterval(timer);
            /*颜色改变完成后，恢复按钮初始背景色*/
            for(var j=0;j<button.length;j++){
                button[j].style.background='#00bc9b';
            }
        }
    },500);

}
function resetColor(){
    clearInterval(timer);
    for(var i=0;i<tree.length;i++){
        tree[i].style.background='#fff';
    }
}

