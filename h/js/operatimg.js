define(["jquery", "hammer", "swiperjquery"],
    function(a, m) {
        var n = !1,
            p, q, l = 0,
            r = document.getElementById("canvas"),
            c = r.getContext("2d"),
            h = new Image,
            s = window.localStorage,
            z = function() {
                return window[m.prefixed(window, "requestAnimationFrame")] ||
                    function(a) {
                        window.setTimeout(a, 1E3 / 60)
                    }
            } ();
        document.querySelector(".sp-canvas-container");
        var k = document.querySelector("#hat_img"),
            u = 200,
            v = 0,
            f,
            w = !1,
            b,
            e = new m.Manager(k),
            n = !1,
            x,
            y,
            A = function() {
                function t() {
                    var a = ["translate3d(" + b.translate.x + "px, " + b.translate.y + "px, 0)", "scale(" + b.scale + ", " + b.scale + ")", "rotate3d(" + b.rx + "," + b.ry + "," + b.rz + "," + b.angle + "deg)"];
                    f = a;
                    a = a.join(" ");
                    k.style.webkitTransform = a;
                    k.style.mozTransform = a;
                    k.style.transform = a;
                    w = !1
                }
                function g() {
                    w || (z(t), w = !0)
                }
                p = a("#hat_img").width();
                q = a("#hat_img").height();
                e.add(new m.Pan({
                    threshold: 0,
                    pointers: 0
                }));
                e.add(new m.Swipe).recognizeWith(e.get("pan"));
                e.add(new m.Rotate({
                    threshold: 0
                })).recognizeWith(e.get("pan"));
                e.add(new m.Pinch({
                    threshold: 0
                })).recognizeWith([e.get("pan"), e.get("rotate")]);
                e.on("panstart panmove",
                    function(a) {
                        k.className = "";
                        b.translate = {
                            x: u + a.deltaX,
                            y: v + a.deltaY
                        };
                        g()
                    });
                e.on("rotatestart rotatemove",
                    function(a) {
                        "rotatestart" == a.type && (d = b.angle || 0);
                        k.className = "";
                        b.rz = 1;
                        b.angle = d + a.rotation;
                        g()
                    });
                e.on("pinchstart pinchmove",
                    function(a) {
                        "pinchstart" == a.type && (c = b.scale || 1);
                        k.className = "";
                        b.scale = c * a.scale;
                        g()
                    });
                e.on("hammer.input",
                    function(c) {
                        if (c.isFinal) {
                            var t = function(a) {
                                    n && (a.preventDefault(), a = x + a.touches[0].pageX - y, b.rz = 1, 0 >= a ? (d.css("left", 0), l = b.angle = 0) : 360 <= a ? (d.css("left", 360), l = b.angle = 360) : (d.css("left", a), l = b.angle = a), g())
                                },
                                e = function(a) {
                                    n = !0;
                                    a.preventDefault();
                                    x = parseFloat(d.position().left);
                                    y = a.touches[0].pageX
                                },
                                d = a("#trim_slide");
                            u = parseFloat(f[0].substring(12, f[0].length - 1).split(",")[0]);
                            v = parseFloat(f[0].substring(12, f[0].length - 1).split(",")[1]);
                            parseFloat(f[1].substring(6, f[1].length - 1).split(",")[0]);
                            l = parseFloat(f[2].substring(9, f[2].length - 1).split(",")[3]);
                            a("#rotate_btn").hide();
                            a("#trim").css("display", "inline-block");
                            a("#trim_box").show();
                            a("#trim").attr("data-istrim", "0").html("\u6536\u8d77");
                            a("#trim_big").on("touchstart",
                                function() {
                                    b.scale += .1;
                                    g()
                                });
                            a("#trim_small").on("touchstart",
                                function() {
                                    b.scale = .1 >= b.scale ? .1 : b.scale - .1;
                                    g()
                                });
                            0 > b.angle ? d.css("left", 360 - -b.angle % 360) : d.css("left", b.angle % 360);
                            a(function() {
                                document.getElementById("trim_slide").addEventListener("touchstart", e);
                                document.getElementById("trim_slide").addEventListener("touchmove", t);
                                document.getElementById("trim_slide").addEventListener("touchend",
                                    function() {
                                        n = !1
                                    })
                            })
                        }
                    });
                var c = 1,
                    d = 0;
                k.className = "animate";
                b = {
                    translate: {
                        x: u,
                        y: v
                    },
                    scale: 1,
                    angle: 0,
                    rx: 0,
                    ry: 0,
                    rz: 0
                };
                g()
            },
            B = function(a) {
                h.src = a;
                h.onload = function() {
                    c.clearRect(0, -200, 600, 800);
                    var a = 600 / h.width * h.height;
                    c.drawImage(h, 0, 300 - a / 2, 600, a)
                }
            };
        return {
            addImg: function(b, c) {
                a(b).change(function(b) {
                    b = b.target.files[0];
                    var d = new FileReader;
                    d.onload = function(b) {
                        B(b.target.result);
                        c && (clearTimeout(c()), a("#firstpage").addClass("flip out"), setTimeout(function() {
                                a("#secondpage").addClass("flip in").removeClass("sp");
                                a("#swiper_container").css("visibility", "visible");
                                a("#firstpage").hide()
                            },
                            225))
                    };
                    d.readAsDataURL(b);
                    return ! 1
                })
            },
            swiperFun: function() {
                new Swiper(".swiper-container", {
                    pagination: ".swiper-pagination",
                    slidesPerView: 3,
                    paginationClickable: !1,
                    spaceBetween: 30,
                    onSlideChangeEnd: function() {
                        a(".swiper-big").removeClass("swiper-big");
                        a(".swiper-small").removeClass("swiper-small")
                    }
                });
                a(".swiper-slide").on("click",
                    function(b) {
                        b = a(b.target).closest(".swiper-slide");
                        b.hasClass("swiper-slide-next") ? b.hasClass("swiper-small") && (a(".swiper-big").removeClass("swiper-big"), b.removeClass("swiper-small")) : (a(".swiper-slide-next").addClass("swiper-small"), a(".swiper-big").removeClass("swiper-big"), b.addClass("swiper-big"));
                        a("#hat_img").show();
                        "" == a("#hat_img").attr("src") && (s.getItem("iffirst") || a("#guide_info_2").show(), s.getItem("isfirst") && a("#trim_info").hide());
                        a("#hat_img").attr("src", b.children().attr("src"));
                        document.getElementById("hat_img").onload = function() {
                            A()
                        }
                    })
            },
            rotateImg: function(a) {
                c.clearRect(0, -200, 600, 800);
                var b = r.width / 2,
                    e = r.height / 2,
                    d = 600 / h.height * h.width;
                c.save();
                c.translate(b, e);
                c.rotate(a * Math.PI / 180);
                c.translate( - b, -e);
                c.drawImage(h, b - d / 2, e - 300, d, 600);
                c.restore()
            },
            creatImg: function(e) {
                s.setItem("iffirst", "1");
                s.setItem("isfirst", "1");
                var g = new Image;
                g.src = a("#hat_img").attr("src");
                a("#secondpage").width();
                a("#canvas").width();
                a(".sp-canvas-container").height();
                a("#canvas").height();
                var f = b.translate.x,
                    d = b.translate.y;
                l %= 360;
                var h = f + p / 2,
                    k = d + q / 2;
                a("#hat_img").hide();
                g.onload = function() {
                    c.save();
                    c.translate(h, k);
                    c.rotate(l * Math.PI / 180);
                    c.scale(b.scale, b.scale);
                    c.drawImage(g, -p / 2, -q / 2, p, q);
                    c.restore();
                    var d = r.toDataURL();
                    a("#result_img").attr("src", d);
                    a("#swiper_container").hide();
                    a(".sp-canvas-container").hide();
                    a("#result_img").show();
                    a("#trim").hide(),
                    a("#trim_box").hide(),
                    a("#creat_btn").hide(),
                    a("#rotate_btn").hide(),
                    a("#upload_img").hide(),
                    a("#tishi").css("visibility", "visible"),
                    a("#reload").css("visibility", "visible"),
                    a("#erweima").css("visibility", "visible"),
                    a(".ershuo").css("visibility", "visible"),
                    a("#share").css("visibility", "visible"),
                    a("#share_img").show()
                }
            }
        }
    });