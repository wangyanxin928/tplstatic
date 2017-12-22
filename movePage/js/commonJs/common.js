/**
 * Created by sanghuina on 2017/12/20.
 * 公共使用的js
 */
var baseUrl = "http://localhost:9003/QuestionnairePG_PNH/";//"http://192.168.1.20:9003/QuestionnairePG_PNH/";//"http://101.200.231.203:9003/QuestionnairePG/";//""http://101.200.231.203:9003/QuestionnairePG/";//"http://localhost/QuestionnairePG/";//"http://101.200.231.203:9003/QuestionnairePG/";
var getdata = function (iter, p, _callback) {
    var obj;
    if (p) {
        obj = {JSONPARAM: JSON.stringify(p)};
    }
    $.ajax({
        type: iter.itype,
        url: baseUrl + iter.iname + "?_n=" + Date.parse(new Date()) / 1000,
        data: obj,
        datatype: "JSON",
        success: function (res) {
            //后台返回的是json
            //res = JSON.parse(res);
            _callback(res);
        },
        error: function (e) {
        }
    });
};
//全屏遮罩层+loading+文字信息【填报端通用】
var showLoadingMsg=function(content){//参数为文字信息
    var layerIndex = layer.open({
        type:1,
        title: false,
        shade:[1, '#ccc'],
        closeBtn: 0,
        content: '<div style="background-color: #ccc;text-align: center;"><div class="" style="margin: auto;width: 60px;height: 24px;background: url(../../js/layer/skin/default/loading-0.gif) no-repeat;"></div><div style="font-size: initial;">'+content+'</div></div>'
    });
    $(".layui-layer.layui-layer-page.layer-anim").css("box-shadow","inherit").css("background-color","initial");
    return layerIndex;
};
//显示提示信息的公共方法
var showMessage= function (type, contentText, _callback) {
    switch (type) {
        case 'success':
            contentText = contentText || '操作成功';
            //成功提示:success
            layer.msg(contentText, {
                icon: 1,
                time: 3000
            });
            break;
        case 'fail':
            contentText = contentText || '操作失败';
            //失败提示:fail
            layer.msg(contentText, {
                icon: 2,
                time: 5000
            });
            break;
        case 'alert':
            contentText = contentText || '警告';
            //警告提示:alert1
            layer.msg(contentText, {
                icon: 0,
                time: 5000
            });
            break;
        case 'alertSure':
            contentText = contentText || '警告';
            //警告提示:alert2
            layer.alert(contentText, {
                icon: 0,
                title: false,
                closeBtn: false
            });
            break;
        case 'confirm':
            contentText = contentText || '确认操作';
            //确认操作:confirm
            layer.confirm(contentText, {icon: 3}, function (index) {
                //do something
                layer.close(index);
                if (_callback) {
                    _callback();
                }
            });
            break;
    }
};
var _UserObject = {
    user_id: "",//"1",//用户id
    user_dlm: "",//""//用户登录名
    user_name: "",//"测试用户",//用户真实姓名
    user_role: "",//"2",//角色值为数字；0无权限，1超级管理员，2教育局人员(教育局管理员),3教官中心人员(教官中心管理员),4校长（学校管理员）,5资料管理员(学校资料上传,量表填写),6教师,7学生
    server_id: null,//"sid_test20171031",//"652ffb6afea946c29ed29eda3dc0b579",// 人员所在集团id
    server_name: "",//"清华大学附属中学",// 人员所在集团名称,学校名称/教育局名称等
    section:"",//学段  20171215 新增
    user_sex: "",//"0",//  用户性别;
    grade_id: "",//"1",//  年级主键;
    class_id: "",//"1",//  班级主键;
    grade_name: "",//"一年级",//  年级名称;
    class_name: "",//"一班",//  班级名称
    user_img: "",//"http://scs.ganjistatic1.com/gjfs15/M08/06/44/CgEHQVYPQi3GOVq0AADKyBjz9NA161_600-0_6-0.jpg",// 用户头像;
    user_age: "",//"1",//  用户年龄;
    user_type: "",//"1",//  用户类型;0无类型，1老师，2学生，3家长
    user_phone: "",//"1",//  用户电话;
    user_email: "",//"1",//  用户邮件;
    state: "",//"1",//启用状态；0未启用，1启用
    xz: "",//"",//学制：1小学五年制，2小学六年制，3初中三年制，4初中四年制，5高中,6是完中(初中和高中共存),7幼儿园
    isanonymous: 0,//1是匿名，0是非匿名，非匿名时user_id和bd_userinfo里的id相关联
    sub_sourcetype: 2,//提交来源，1是用户名密码登录，2是微信，3是邮箱，4是pc，5是移动设备
    nick_name: ""//存储微信昵称，在没有用户名时使用
};
var getUserInfoFromCookie=function(callback){
    //从cookie获取用户信息
    var userInfoFromCookie = getcookie("userInfo");
    if(userInfoFromCookie){
        _UserObject = JSON.parse(userInfoFromCookie);
    }
    callback&&callback();
};
$(window).on("load", function () {
    //从cookie获取用户信息
    var userInfoFromCookie = getcookie("userInfo");
    if(userInfoFromCookie){
        _UserObject = JSON.parse(userInfoFromCookie);
    }else{

    }
});
//获取cookie里面的值
var getcookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
//设置cookie
var setcookie = function (name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};
var getUrlPara = function (m) {
    var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
    return sValue ? sValue[1] : sValue;
};
/*收起折叠事件区域框*/
var bodyCollapse = function () {
    $("body").delegate(".bodycollapse", "click", function (e) {
        var $a = $(e.target);
        if ($a.hasClass("collapse")) {
            $a.parents(".portlet").find(".portlet-body").hide();
            $a.removeClass("collapse");
            $a.addClass("expand");
        } else {
            $a.parents(".portlet").find(".portlet-body").show();
            $a.removeClass("expand");
            $a.addClass("collapse");
        }
    });
};
