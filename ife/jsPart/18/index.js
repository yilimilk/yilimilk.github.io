//事件绑定浏览器兼容
function addEvent(el,ev,fn){
    try{ 
        el.addEventListener(ev,fn,false);
    }catch(e){
        try{  
            el.attachEvent('on' + ev,fn);
        }catch(e){ 
            el['on' + ev] = fn;
        }
    }
}
function each(arr, fn){
    var l =arr.length;
    for(var i =0;i <l;i++){
        fn(arr[i],i);
    }
};
window.onload = function(){
    var l_in = document.getElementById('l_in');
    var r_in = document.getElementById('r_in');
    var l_out = document.getElementById('l_out');
    var r_out = document.getElementById('r_out');
    var container = document.getElementById('container');
    var inputV = document.getElementById('input');
//定义线性数据结构
    var quene = {
        list : [],
        repaint : function(){
            var str = '';
            each(this.list,function(val){
                str+='<div>'+parseInt(val)+'</div>';
            });
            container.innerHTML = str;
            addDel();
        },
        lIn: function(v){
            this.list.unshift(v);
            this.repaint();
        },
        lOut: function(){
            this.list.shift();
            if (this.isEmpty()) {alert("this quene is empty")};
            this.repaint();
        },
        rIn: function(v){
            this.list.push(v);
            this.repaint();
        },
        rOut: function(){
            this.list.pop();
            if (this.isEmpty()) {alert("this quene is empty")};
            this.repaint();
        },
        isEmpty: function(){
            return this.list.length == 0;
        },
        del: function(i){
            this.list.splice(i,1);
            this.repaint();
        }
    };
    addEvent(l_in, "click", function(){
        var val = inputV.value;
        if(val.match(/^[0-9]+$/)){
            quene.lIn(val);
        }else {
            alert("please enter a number");
        }
    });
    addEvent(r_in, "click", function(){
        var val = inputV.value;
        if(val.match(/^[0-9]+$/)){
            quene.rIn(val);
        }else {
            alert("please enter a number");
        }
    });
    addEvent(l_out, "click", function(){quene.lOut();});
    addEvent(r_out, "click", function(){quene.rOut();});
    function addDel(){
        var l = container.childNodes.length;
        for( var i =0;i<l;i++){
            addEvent(container.childNodes[i], "click", function(i){
                return function(){
                    return quene.del(i);
                };
            }(i));
        };
    };
};