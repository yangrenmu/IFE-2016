#总结：
1. 正则表达式: /^[A-z\u4e00-\u9fff]+$/；<br><pre>
    ^　　　　　　　　 　：　开始匹配；
    [A-z\u4e00-\u9fff]：　查找[]之间任何字符；
    A-z　　　　　　　　　：　查找任何从大写A到小写z的字符；
    \uxxx　　　　　　　　：　查找以十六进制数xxx规定的Unicode字符；
    \u4e00-\u9fff　　　　　:　查找中文字符；
    n+　　　　　　　　　　：　匹配任何包含至少一个n的字符串。
2.  return;<br><pre>
    终止函数的执行并返回函数的值。此处作用是弹出城市名必须为中英文后，不再弹出下面的alert;
3.  aqiData[city]=num;<br><pre>
    为aqiData对象添加值为num的city属性，city=document.getElementById('aqi-city-input').value.trim();
4.  addEventListener(事件，函数);<br><pre>
    给元素绑定事件。
