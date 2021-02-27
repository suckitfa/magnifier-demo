$(function() {
    // 获取要操作的元素
    let $abbre = $('.abbre'),
        $mark = $abbre.find('.mark'),
        $origin = $('.origin'),
        $originImg = $origin.find('img');

    // 计算mark盒子的位置
    let abbreW = $abbre.outerWidth(),
        abbreH = $abbre.outerHeight(),
        abbreOffset = $abbre.offset(),
        markW = $mark.outerWidth(),
        markH = $mark.outerHeight(),
        originW = $origin.outerWidth(),
        originH = $origin.outerHeight(),
        originImgW = abbreW / markW * originW,
        originImgH = abbreH / markH * originH;
    console.log(abbreW, abbreH);
    console.log(markW, markH);

    function computedMark(ev) {
        // 计算mark的位置
        let markL = ev.pageX - abbreOffset.left - markW / 2,
            markT = ev.pageY - abbreOffset.top - markH / 2;
        // 边界判断
        let minL = 0,
            minT = 0,
            maxL = abbreW - markW,
            maxT = abbreH - markH;
        markL = markL < minL ? minL : (markL > maxL ? maxL : markL);
        markT = markT < minT ? minT : (markT > maxT ? maxT : markT);

        // 控制mark的移动
        $mark.css({
            left: markL,
            top: markT
        });
        // 控制大图移动
        $originImg.css({
            left: -markL / abbreW * originImgW,
            top: -markT / abbreH * originImgH
        });
    }
    $abbre.on('mouseenter', function(ev) {
        let see = {
            "display": "block"
        };
        computedMark(ev);
        $mark.css(see)
        $origin.css(see)
    }).on("mouseleave", function(ev) {
        let notSee = {
            display: "none"
        };
        $mark.css(notSee);
        $origin.css(notSee);
    }).on('mousemove', function(ev) {
        // 鼠标移动
        computedMark(ev);
    });
});