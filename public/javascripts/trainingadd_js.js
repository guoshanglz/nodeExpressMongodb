/**
 * Created by guoshan on 2017/10/24.
 */
$(function () {

    //截取url id  http://localhost:3000/trainingadd?id=59e84567cd5d082b78888746
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };
    var myurl=GetQueryString("id");
    if(myurl !=null && myurl.toString().length>1) {
        //当url附带id时 直接向/change请求数据插入dom
        var _id=GetQueryString('id');
        var updata2={"_id":_id};
        $.ajax({
            url:'/changeGetMsg',
            type:'post',
            data:updata2,
            success:function (data,status) {
                // console.log(data[0]._id);
                var place=data[0].place,
                    name=data[0].name,
                    address=data[0].address,
                    son=data[0].son,
                    other=data[0].other;
                $('.name').val(name);
                $('.address').val(address);
                $('.son').val(son);
                $('.other').val(other);
            }
        });

        var handler = function (captchaObj) {
            captchaObj.appendTo('#captcha');
            captchaObj.onReady(function () {
                $("#wait").hide();
            });

            $(".upload").click(function () {
                console.log("a1");
                var result = captchaObj.getValidate();
                if (!result) {
                    return alert('请完成验证');
                };
                console.log("a2")
                var place=$("select[id=place]").val();
                var name=$(".name").val();
                var address=$(".address").val();
                var son=$(".son").val();
                var other=$(".other").val();
                var updata={"_id":_id,"place":place,"name":name,"address":address,"son":son,"other":other};
                if(place!==""&& place!==null && name!==""&&name!==null && address!==""&&address!==null && son!==""&&son!==null && other!==""&&other!==null){
                    console.log("a3");
                    $.ajax({
                        url:'/change',
                        type:'post',
                        data:updata,
                        success:function (data,status) {

                            alert(data);
                            location.href = 'traininglistPage';
                        }
                    })

                }else {
                    console.log("a4_4")
                    var img= $("<h3>不能有空项 用点心写<img src='/images/angry.gif'></h3>");
                    $(".imgdiv").empty();
                    $(".imgdiv").append(img);
                }

            });
            window.gt = captchaObj;
        };
        $.ajax({
            url: "http://www.geetest.com/demo/gt/register-slide?t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {
                // 调用 initGeetest 进行初始化
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
                initGeetest({
                    // 以下 4 个配置参数为必须，不能缺少
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                    new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                    product: "float", // 产品形式，包括：float，popup
                    width: "300px"
                    // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
                }, handler);
            }
        });



    }else {
        //当url不附带id时
        var handler = function (captchaObj) {
            captchaObj.appendTo('#captcha');
            captchaObj.onReady(function () {
                $("#wait").hide();
            });

            $(".upload").click(function () {
                console.log("a1");
                var result = captchaObj.getValidate();
                if (!result) {
                    return alert('请完成验证');
                };
                console.log("a2")
                var place=$("select[id=place]").val();
                var name=$(".name").val();
                var address=$(".address").val();
                var son=$(".son").val();
                var other=$(".other").val();

                var updata={"place":place,"name":name,"address":address,"son":son,"other":other,
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode};
                if(place!==""&& place!==null && name!==""&&name!==null && address!==""&&address!==null && son!==""&&son!==null && other!==""&&other!==null){
                    console.log("a3");
                    $.ajax({
                        url:'/trainingadd',
                        type:'post',
                        data:updata,
                        success:function (data,status) {
                            alert(data);
                            location.href = 'traininglistPage';
                        }
                    })

                }else {
                    console.log("a4_4")
                    var img= $("<h3>不能有空项 用点心写<img src='/images/angry.gif'></h3>");
                    $(".imgdiv").empty();
                    $(".imgdiv").append(img);
                }

            });
            window.gt = captchaObj;
        };
        $.ajax({
            url: "http://www.geetest.com/demo/gt/register-slide?t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {
                // 调用 initGeetest 进行初始化
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
                initGeetest({
                    // 以下 4 个配置参数为必须，不能缺少
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                    new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                    product: "float", // 产品形式，包括：float，popup
                    width: "300px"
                    // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
                }, handler);
            }
        });
    }



//        $(".upload").click(function () {
//            console.log("a1")
//            $('.dbnull').val('');
//            //因为sql写的不6 所以input强行不为空
//            if($('.dbnull').val()===""||$('.dbnull').val()===null){
//                console.log("a2")
//                $('.dbnull').val('&nbsp;');
//                var place=$("select[id=place]").val();
//                var name=$(".name").val();
//                var address=$(".address").val();
//                var son=$(".son").val();
//                var other=$(".other").val();
//                var updata={"place":place,"name":name,"address":address,"son":son,"other":other};
//                if(!(place===""||place===null) && !(name===""||name===null)){
//                    console.log("a3")
//                    $.ajax({
//                        url:'/trainingadd',
//                        type:'post',
//                        data:updata,
//                        success:function (data,status) {
//                            alert(data);
//                            location.href = 'traininglist';
//                        }
//                    })
//
//                }else {
//                    console.log("a4")
////                    var img= $("<h3><%= h3 %> <img src='/images/angry.gif'></h3>");
//                    var img= $("<h3>地区和name不能为空 用点心写<img src='/images/angry.gif'></h3>");
//                    $(".imgdiv").empty();
//                    $(".imgdiv").append(img);
////                    return false;
//                }
//            }
//
//        });
    $(".name").change(function () {

        changeimg()
    });
    $(".address").change(function () {
        changeimg()
    });
    $(".son").change(function () {
        changeimg()
    });
    $("select[id=place]").change(function () {
        changeimg()
    });
    $(".other").change(function () {
        changeimg()
    });
    function changeimg() {
        var place=$("select[id=place]").val();
        var name=$(".name").val();
        var address=$(".address").val();
        var son=$(".son").val();
        var other=$(".other").val();
        if(!(place===""||place===null) && !(name===""||name===null)&& !(address===""||address===null)
            && !(son===""||son===null)&& !(other===""||other===null)){
            $(".imgdiv").empty();
        }
    };

})