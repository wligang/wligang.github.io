define(["jquery"], function (b) {
    var c = ["#dabai","#droaemon"],
        d, a = 0;
    return {
        startFlip: function () {
            var e = null,
                f = null,
                g = function () {
                    f = b(c[a]);
                    1 == a && (a = -1);
                    e = b(c[a + 1]);
                    a += 1;
                    f.addClass("out").removeClass("in");
                    setTimeout(function () {
                        e.addClass("in").removeClass("out");
                        d = setTimeout(function () {
                            g()
                        }, 2E3)
                    }, 225)
                };
            g()
        },
        stopFlip: function () {
            return d
        }
    }
});