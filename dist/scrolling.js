/**
 * scrolling
 * 西门
 * 0.1.0(160717)
 */
;(function(){
    // requestAnimationFrame兼容出处：http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

    // scrolling
    var documentBody = document.body;
    var scroll = function(opts){
        init(this, opts);
    };
    function init(me, opts){
        me.opts = extend({
            dom: document.documentElement,    // 滚动到指定DOM的位置
            speed: 500,                       // 滚动速度
            callback : function(){}           // 滚动完毕回调
        }, opts);
        // 获取页面当前scrollTop
        me.curScrollTop = Math.round(documentBody.scrollTop);
        // 获取dom到网页顶部的距离
        me.domOffsetTop = Math.round(me.opts.dom.getBoundingClientRect().top + me.curScrollTop);
        // 单位时间滚动的距离
        me.scrollDistance = (1000/60).toFixed(2) * Math.abs(me.curScrollTop-me.domOffsetTop) / me.opts.speed;
        // 转number类型并取小数点2位
        me.scrollDistance = Number(me.scrollDistance.toFixed(2));

        fnScroll(me);
    }
    function fnScroll(me){
        // 如果操作在目标的下方，往上滚动（大部分情况）
        if(me.curScrollTop > me.domOffsetTop){
            // 递减
            me.curScrollTop -= me.scrollDistance;
            // 如果计算的scrollTop大于实际需要的scrollTop，继续重新调用
            if(me.curScrollTop > me.domOffsetTop){
                // 滚动页面
                documentBody.scrollTop = me.curScrollTop;
                // 重新调用
                requestAnimationFrame(function(){
                    fnScroll(me);
                });
            // 如果计算的scrollTop小于实际需要的scrollTop，直接赋值最终的scrollTop
            }else{
                documentBody.scrollTop = me.domOffsetTop;
                // 执行回调
                me.opts.callback();
            }
        // 情况相反
        }else if(me.curScrollTop < me.domOffsetTop){
            me.curScrollTop += me.scrollDistance;
            if(me.curScrollTop < me.domOffsetTop){
                documentBody.scrollTop = me.curScrollTop;
                requestAnimationFrame(function(){
                    fnScroll(me);
                });
            }else{
                documentBody.scrollTop = me.domOffsetTop;
                me.opts.callback();
            }
        // 位置相等
        }else{
            return me.opts.callback();
        }
    }

    // extend
    function extend(){
        var _extend = function me(dest, source) {
            for (var name in dest) {
                if (dest.hasOwnProperty(name)) {
                    //当前属性是否为对象,如果为对象，则进行递归
                    if ((dest[name] instanceof Object) && (source[name] instanceof Object)) {
                        me(dest[name], source[name]);
                    }
                    //检测该属性是否存在
                    if (source.hasOwnProperty(name)) {
                        continue;
                    } else {
                        source[name] = dest[name];
                    }
                }
            }
        };
        var _result = {},
            arr = arguments;
        //遍历属性，至后向前
        if (!arr.length) return {};
        for (var i = arr.length - 1; i >= 0; i--) {
            _extend(arr[i], _result);
        }
        arr[0] = _result;
        return _result;
    }

    scrolling = function(opts){
        var optsions = typeof opts == 'object' && opts;
        return new scroll(optsions);
    };
}());