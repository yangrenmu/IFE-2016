window.onload=function(){
    var button=document.getElementsByClassName('button');
    var numInput=document.getElementById('num-input');
    var ul=document.getElementById('show'); 
    var random=document.getElementById('random');
    var sort=document.getElementById('sort');
    var text="";
    var data=[];
    button[0].addEventListener('click',function(){
        var input=numInput.value.trim(); 
        console.log(data.length);   
        if(!input.match(/^\d+$/)||parseInt(input)<10||parseInt(input)>99){
            console.log(parseInt(input,10));
            alert("请输入10-99的整数");
            return;    
        }
        if(data.length>21){
            alert("太多啦");
            return;
        }
        data.splice(0,0,input);
        renderData();  
        // text='<li>'+input+'</li>'+text;
        // ul.innerHTML=text;
    });
    button[1].addEventListener('click',function(){
        var input=numInput.value.trim();    
        if(!input.match(/^\d+$/)||parseInt(input)<10||parseInt(input)>99){
            console.log(parseInt(input,10));
            alert("请输入10-99的整数");
            return;    
        }
        if(data.length>21){
            alert("太多啦");
            return;
        }
        data.push(input);
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
            text+='<li id="li-'+i+'" style="height:'+data[i]*1.5+'px;" >'+data[i]+'</li>';
        }
        ul.innerHTML=text;
    }
    random.addEventListener('click',function(){
        data=[];
        for(var i=0;i<20;i++){
            data[i]=Math.floor(Math.random()*90+10);
        }
        renderData();
    });
    sort.addEventListener('click',function(){
        var timer=setInterval(bubble,30);
        var temp,i=0,j=1;
        function bubble(){
            console.log(i);
            if(i<data.length){ 
                if(j<data.length-i){
                    if(data[j]<data[j-1]){
                        temp=data[j-1];
                        data[j-1]=data[j];
                        data[j]=temp;
                        renderData();               
                    }
                    j++;
                }else{
                    j=1;
                    i++;   
                }  
            }else{
                clearInterval(timer);
                return;
            }
        }
    });
}

