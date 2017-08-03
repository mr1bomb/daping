/**
 * Created by kerry on 15/5/20.
 */
(function($){
    $.fn.itemScoller = function(options){
        var o=this;
        o.requestCount=0;
        o.defaults={
            key:"key",
            value:"value",
            interval:1000,//排序间隔
            refresh_interval:10*1000,//刷新时间
            count:10,//最大显示行数
            child:"tr",//每一行的最外层元素  !!该参数失效
            externals:[],//每次异步请求后的回调方法s ,按顺序执行
            auto_refresh:true,//自动异步刷新
            effect:true,
            reStoreRequestCount:40

        };
        o.sorting=false;
        o.options= $.extend(o.defaults,options);
        o.reloadOption=__call__.reloadOption;
        o.refresh=__call__.refresh;
         __call__.load.call(o);
        return o;

    }
    var __call__={
        reloadOption:function(options){
            var o=this;
            o.options= $.extend(o.options,options);
        },
        load:function(){
           var o=this;
            $.ajax({
                url: o.options.ajaxUrl,
                success:function(json){
                    var items=o.options.items?json[o.options.items]: json['data'][0]['ranklist'];
                    __functions__.store.call(o,items,json,function(){
                        if(o.options.compare){
                            __functions__.sort.call(o);//启用排序
                        }
                    });
                    o.prev=false;
                    o.current=json;
                    __call__.callbacks.call(o);//启用回调
                    if(o.options.draw){
                        o.options.auto_refresh&&__call__.refresh.call(o);//定时刷新
                    }

                }

            });
        },

        refresh: function (now) {
            var o=this;
            var fun=function(){
                $.ajax({
                    url:o.options.ajaxUrl,
                    success:function(json){
                        //console.info(json);
                        o.requestCount=o.requestCount+1;

                        var items=o.options.items?json[o.options.items]:json['data'][0]['ranklist'];
                        o.prev= o.current; // false = json
                        o.current=json;
                        __call__.callbacks.call(o);//每次刷新后启用回调
                        //if(o.requestCount>= o.options.reStoreRequestCount){
                        //    o.requestCount=0;
                        //    __functions__.store.call(o,items,json);
                        //}else{
                        if(o.options.compare){
                            __functions__.diff.call(o,items,json,function(){
                                __functions__.sort.call(o);//启用排序
                            });//重构显示单元
                        }else{
                            __functions__.store.call(o,items,json);
                        }
                        //}





                    }
                });
            }
            if(now){
                //o.html("");
                fun();
            }else{
                setInterval(function(){
                    fun()
                }, o.options.refresh_interval);
            }

        },
        callbacks:function(){
            var prev=this.prev;
            var current=this.current;
            var o=this;
            this.options.externals.forEach(function(f){
                if(typeof  f ==='function'){
                    f.call(o,prev,current);
                }
            });

        }

    };
    var __functions__={
        store:function(items,json,callback){
            var o=this;
            o.html("");
            var tempNum = 0;
            $.each(items,function(i,item){
                if(o.options.draw && tempNum < o.options.count){

                    var _oi= o.options.draw.call(o,i,item,json);//每一行显示的回调
                    if(_oi){
                        tempNum += 1;
                        o.options.key&&_oi.attr("key",item[o.options.key]); //每一行按key设置标记
                        o.options.value&&_oi.data("value",item[o.options.value]);//每一行按value设置标记 后面用于排序
                    }
                    if(_oi){
                        if(o.options.effect){
                            setTimeout(function(){
                                o.append(_oi);
                                _oi.addClass("a-fadeinR");
                                // o.options.vauleScoller&&o.options.vauleScoller.call(this,_oi,0,item[o.options.value],o.prev, o.current);
                                if(i==items.length-1){
                                    callback&&callback();
                                }
                            },i*400);
                        }else{
                            o.append(_oi);
                        }
                    }


                }
            });


        },
        diff:function(destItems,json,callback){
            var o=this;
            var prevKeys={};
            $.each(o.children(),function(i,oi){
                var key=$(oi).attr("key");
                prevKeys[key]=1;
            });
            var updateKeys={};
            var tempNum = 0;
            $.each(destItems,function(i,item){
                if(tempNum < o.options.count){
                    var _curOI= o.options.draw.call(o,i,item,json);
                    if(_curOI){
                        tempNum += 1;
                        _curOI.attr("key",item[o.options.key]);
                        _curOI.data("value",item[o.options.value]);
                        //如果已经存在,更新
                        var key=item[o.options.key];
                        if(prevKeys[key]){
                            updateKeys[key]=1;
                            var _oi=$("[key='"+ key+"']",o);
                            _oi.after(_curOI);
                            o.options.vauleScoller&&o.options.vauleScoller.call(this,_curOI,_oi.data("value"),item[o.options.value], o.prev, o.current);

                            _oi.addClass("a-fadeoutL");
                            _oi.remove();
                        }else{//新增的
                            o.append(_curOI);

                            _curOI.addClass("a-fadeinR");


                        }
                    }
                }


            });
            callback&&callback();



            $.each(prevKeys,function(key,v){//删除不存在的
                if(!updateKeys[key]){
                    var _oi=$("[key='"+ key+"']",o);
                    _oi.remove();
                }
            });

             o.options.afterDraw&&o.options.afterDraw.call(o,json);



            //for(var i=0;i<destItems.length;i++){
            //    var _oi=$("[key='"+ destItems[i][o.options.key]+"']",o);
            //    var _curOI= o.options.draw.call(o,i,destItems[i],json);
            //    _curOI.show();
            //    _curOI.attr("key",destItems[i][o.options.key]);
            //    _curOI.data("value",destItems[i][o.options.value]);
            //    if(_oi.length>0){//已经存在的
            //        if(_oi.is(":hidden")){
            //            _curOI.hide();
            //        }
            //        _oi.after(_curOI);
            //        _oi.remove();
            //
            //    }else{//新的item
            //        //判断当前数据是不是多余最大行数 如果是 设置为hide
            //        var len= o.children().length;
            //        //console.info(len);
            //        if(len>=10){
            //            _curOI.hide();
            //        }
            //        o.append(_curOI);
            //    }
            //}
           // o.options.afterDraw&&o.options.afterDraw.call(o,json);
        },
        sort:function(){
            var o=this;

            if(!o.sorting){
                o.sorting=true;
                //console.info(o.children().length);
                o.sortIns=setInterval(function(){//不停的监听前一块和后一块的value值 如果符合排序规则  2块的顺序进行交换
                    var ols= o.children();
                    __functions__.sortOne.call(o,ols);

                }, o.options.interval);
            }

        },
        sortOne:function(ols){
            var o=this;

            for(var i=0;i<=ols.length-2;i++){
                for(var j=i+1;j<=ols.length-1;j++){
                    if((i==ols.length-2)&&(j==ols.length-1)){//排序结束
                        clearInterval(o.sortIns);
                        o.options.afterSort&&o.options.afterSort.call(o,ols);
                        o.sorting=false;
                    }
                    var a=$(ols[i]);
                    var b=$(ols[j]);
                    var va= a.data("value");
                    var vb= b.data("value");
                    if(o.options.compare(va,vb)){
                        b.insertBefore(a);
                        if(b.is(":hidden")){
                            b.show();
                            b.addClass("a-fadeinR");
                            var last= $(o.options.child+":visible",o).last();
                            last.hide();
                        }else{
                            b.addClass("a-fadeinB");
                        }

                        o.options.afterSort&&o.options.afterSort.call(o,ols);
                        return
                    }

                }
              //  o.options.afterSort&&o.options.afterSort.call(o,ols);

            }


        }

    };


})(jQuery);
