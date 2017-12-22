define(["jquery", "h/js/flipimg", "h/js/operatimg"], function (a, d, b) {
    var f = navigator.userAgent,
        e = !1;
    return {
        enter: function () {
            //0 <= f.indexOf("Android") && (e = !0);
            setTimeout(function(){
                d.startFlip();
            }, 800);
            b.swiperFun();
            a(document).on("click", "#clickbegin", function () {
                _hmt.push(['_trackEvent', '点击', '点击进入制作', '', 1]);
                b.addImg("#img_load", d.stopFlip)
            });
            a(document).on("touchstart", "#rotate_btn", function () {
                var c = parseInt(a("#rotate_btn").attr("data-degree"));
                b.rotateImg(c);
                c = 360 == c ? 90 : c + 90;
                a("#rotate_btn").attr("data-degree", c)
            });
            a(document).on("touchstart", "#upload_img", function () {
                _hmt.push(['_trackEvent', '点击', '制作过程中重新上传图片', '', 1]);
                b.addImg("#upload")
            });
            a("#guide_info_2").on("touchstart", function () {
                a("#guide_info_2").hide()
            });
            a(document).on("touchstart", "#creat_btn", function () {
                "" != a("#hat_img").attr("src") && "none" != a("#hat_img").css("display") ? b.creatImg(e) : alert(
                    "请选择帽子")
            });
            a("#reload").on("touchstart", function () {
                _hmt.push(['_trackEvent', '点击', '再做一顶', '', 1]);
                location.href = location.href + '?time=' + ((new Date()).getTime())
            });
            a("#trim").on("touchstart", function () {
                "1" == a("#trim").attr("data-istrim") ? (a("#trim_box").show(), a("#trim").attr("data-istrim", "0").html(
                    "收起")) : (a("#trim_box").hide(), a("#trim").attr("data-istrim", "1").html(
                    "微调器"))
            });
            a("#trim_box").on("touchstart", function () {
                a("#trim_info").hide()
            })
        }
    }
});