/**
 *@name
 *@author Sean.xiang
 *@date 17/4/18
 *@version
 *@desc
 */
/**
 * ajax请求错误解析，适用于jquery ajax、jquery form的error,如:
 * $.ajax({
* 	error:errorParser
* });
 * $('form').ajaxForm({
* 	error:errorParser
* });
 */
$.errorParser = function(responseText,statusText,callback){
    var msg = null;
    if(responseText.status == 500){
        msg = '程序执行失败！';
    }else if(responseText.status == 404){
        msg = '请求的资源不存在！';
    }else if(statusText == 'timeout'){
        msg = '程序处理超时！';
    }else if(statusText == 'parsererror'){
        msg = '解析结果失败！';
    }else if(statusText == 'abort'){
        //请求被中断不算出错
    }else{
        msg = '操作失败！';
    }
    if(msg){
        if($.isFunction(callback)){
            callback(msg);
        }else{
            // $.alert(msg);
            console.error(msg);
        }
    }
};
$.successParser = function(obj,successCall,errorCall){
    /*if(obj && !obj.fail){
        if($.isFunction(successCall)){
            successCall(obj);
        }
    }else if(obj && obj.kickout){
        $.alert('提示','您已被<label style="color:red;">'+obj.kickip+'</label>强制下线，请重新登录！',function(r){
            top.location.reload(true);
        });
    }else if(obj && obj.sessionout){
        $.alert('提示','会话已超时过期，请重新登录！',function(r){
            top.location.reload(true);
        });
    }else if(obj && obj.licensevalid){
        $.alert('提示','发现授权许可异常，请重新验证！',function(r){
            top.location.reload(true);
        });
    }else if($.isFunction(errorCall)){
        errorCall(obj?obj.mesg:null);
    }else{
        $.alert('提示',obj && obj.mesg ? obj.mesg : '操作失败');
    }*/
};
//全局ajax设置
$.ajaxSetup({
    dataType:'json',
    type:'post',
    timeout:60*1000,
    global:false,
    cache:false,
    error:$.errorParser
});
//文件下载、导出
$.fileDownLoad = function(){
    var url,params = {},callback = arguments[2]||$.noop;
    if(arguments.length == 1){
        url = arguments[0];
    }else{
        url = arguments[0];
        params = arguments[1];
    }
    var _f_ = $('<form>');
    _f_.attr('target','').hide();
    _f_.attr('method','post').attr('action',url);
    $.each(params,function(i,o){
        var _in_ = $('<input>');
        _in_.attr('type','hidden');
        _in_.attr('name',i);
        _in_.attr('value',o);
        _f_.append(_in_);
    });
    $('body').append(_f_);
    _f_.submit();
    _f_.remove();
    if(callback){
        callback();
    }
};
//截取字符串，忽略中英文
$.cutstr = function(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            // 中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    // 如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
};
//获取字符串长度，忽略中英文
$.getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
};
//js Date对象扩展:new Date().format('yyyy-MM-dd hh:mm:ss.S')
Date.prototype.format = function(fmt){
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};