#总结：
* 1  tab切换；<br/><pre>
  1.设置input type="radio"。
  2.通过lable中for与input中id一致，来绑定相应的input。
  3.input中name不可省略，且每个input中name要一致。
* 2.:checked；<br/><pre>
  通过checked来显示对应的tab内容，input:checked ~ content{},使用 ~ 时input与content处于同一级。
  E~F：匹配E后所有F，在DOM结构中，E和F处于同一级。
* 3.background添加两张图片；<br/><pre>
  background: url(../img/left-arrow01.png) 0px center no-repeat,
                url(../img/left-file02.png) 15px center no-repeat;
* 4.背景图片距离右侧8px；<br/><pre>
  background-position: calc(100% - 8px) center;当宽度不同时，离右侧距离相同可以使用此方法。
* 5.background-size；<br/><pre>
  background-size: 10px 11px;设置背景图片大小。
* 6.::before :hover::before；<br/><pre>
  通过：hover添加border时，使背景图片和内容移动距离不一致。可在边界处添加::before，通过设置::before的样式，
来达到边框的效果。 详见css 377行。
* 7.border-collapse:collapse；<br/><pre>
  边框合并为单一边框，若不设置此属性，默认边框之间会有空隙。
