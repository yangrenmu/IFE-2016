window.onload=function(){
    var button=document.getElementsByClassName('button');
    var textInput=document.getElementById('textarea');
    var ul=document.getElementById('show'); 
    var random=document.getElementById('random');
    var searchInput=document.getElementById('search-input');
    var search=document.getElementById('search');
    var text="";
    var data=[];
    button[0].addEventListener('click',function(){
        var arr=textInput.value.trim(); 
        // 当间隔符位于起始位置时，split会分割出空字符，用filter滤除。
        var input=arr.split(/[^0-9A-z\u4e00-\u9fa5]+/).filter(function(e){
            return e !== '';
        });
        for(var i=0;i<input.length;i++){
            data.splice(0,0,input[i]);
        }        
        renderData();  
        // text='<li>'+input+'</li>'+text;
        // ul.innerHTML=text;
    });
    button[1].addEventListener('click',function(){
        var arr=textInput.value.trim();  
        var input=arr.split(/[^0-9A-z\u4e00-\u9fa5]+/).filter(function(e){
            return e !== '';
        });
        for(var i=0;i<input.length;i++){
            data.push(input[i]);
        }           
        renderData();
        // text=text+'<li>'+input+'</li>';
        // ul.innerHTML=text;
    });
    button[2].addEventListener('click',function(){     
        if(!ul.firstChild){
            alert("数列为空");
            return;
        }
        alert('左侧 '+ul.firstChild.innerHTML+' 将被移出');
        data.splice(0,1);
        renderData();
        // ul.removeChild(ul.firstChild);
        // text=ul.innerHTML;
    });
    button[3].addEventListener('click',function(){     
        if(!ul.lastChild){
            alert("数列为空");
            return;
        }
        alert('右侧 '+ul.lastChild.innerHTML+' 将被移出');
        data.pop();
        renderData();
        // ul.removeChild(ul.lastChild);
        // text=ul.innerHTML;
    });
    ul.addEventListener('click',function(event){
        console.log(event);
        var li=event.target;
        if(li.tagName==='LI'){
            alert('将移除 '+li.innerHTML);
            // ul.removeChild(li);
            // text=ul.innerHTML;
        }else return;
        console.log(li.getAttribute("id"));
        data.splice(li.getAttribute('id').substr(3),1);
        renderData();
    })
    function renderData(){
        text="";
        for(var i=0;i<data.length;i++){
            text+='<li id="li-'+i+'">'+data[i]+'</li>';
        }
        ul.innerHTML=text;
    }
    random.addEventListener('click',function(){
        data=[];
        for(var i=0;i<10;i++){
            data[i]=randomString(Math.ceil(Math.random()*10)+1);
        }
        renderData();
    });
    function randomString(length){
        var char='ABCDEFGHIJKMLNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz0123456789';
        var charText='';
        for(var i=0;i<length;i++){
            charText+=char.charAt(Math.floor(Math.random()*char.length));
        }
        console.log(charText);
        return charText;
        
    }   
    search.addEventListener('click',function(){
        console.log(searchInput.value);
        console.log(ul.childNodes.length);
        for(var i=0;i<ul.childNodes.length;i++){
            ul.childNodes[i].style.color="#fff";
        }
        for(var i=0;i<ul.childNodes.length;i++){
            if(ul.childNodes[i].innerHTML.indexOf(searchInput.value)!==-1){
                ul.childNodes[i].style.color="#000";
                ul.childNodes[i].style.background="#ffff00";
            }
            
        }
    });
}

