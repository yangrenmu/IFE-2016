window.onload=function(){
    var button=document.getElementsByClassName('button');
    var numInput=document.getElementById('num-input');
    var ul=document.getElementById('show'); 
    var text="";

    button[0].addEventListener('click',function(){
        var input=numInput.value.trim();    
        if(!input.match(/^\d+$/)){
            alert("请输入整数");
            return;
        }
        text='<li>'+input+'</li>'+text;
        ul.innerHTML=text;
    });
    button[1].addEventListener('click',function(){
        var input=numInput.value.trim();    
        if(!input.match(/^\d+$/)){
            alert("请输入整数");
            return;
        }
        text=text+'<li>'+input+'</li>';
        ul.innerHTML=text;
    });
    button[2].addEventListener('click',function(){     
        if(!ul.firstChild){
            alert("数列为空");
            return;
        }
        alert('左侧 '+ul.firstChild.innerHTML+' 将被移出');
        ul.removeChild(ul.firstChild);
        text=ul.innerHTML;
    });
    button[3].addEventListener('click',function(){     
        if(!ul.lastChild){
            alert("数列为空");
            return;
        }
        alert('右侧 '+ul.lastChild.innerHTML+' 将被移出');
        ul.removeChild(ul.lastChild);
        text=ul.innerHTML;
    });
    ul.addEventListener('click',function(event){
        console.log(event);
        var li=event.target;
        if(li.tagName==='LI'){
            alert('将移除 '+li.innerHTML);
            ul.removeChild(li);
            text=ul.innerHTML;
        }
        
    })
    

}

