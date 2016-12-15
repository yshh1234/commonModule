/**
 * Created by Evonnehui on 2016/12/15.
 */
window.onload = function () {
        //客户端信息
        var _userAgent = navigator.userAgent;
        //判断IPHONE
        var offset = 0;
        if (_userAgent.indexOf('iPhone') >= 0) {
            var screenHeight = window.screen.height;
            offset = 0.25 * screenHeight;
//            //分类型设置高低差
//            if (screenHeight === 568) {
//                //IP5 IPSE
//                offset = 149;
//            } else if (screenHeight === 480) {
//                //IP 2G 3G 3GS 4 4S
//                offset = 149;
//            } else if (screenHeight === 667) {
//                //IP 6 6s
//            } else if (screenHeight === 736) {
//                //IP 6p
//            }
            /**
             * 5.5吋271
             * 4.7吋258
             * 4.0吋253
             *
             * 5.5吋226
             * 4.7吋216
             * 4.0吋216
             */
            $('body').on('focus', 'input', function () {
                var _eleOffsetTop = this.offsetTop;
                var _eleHeight = this.height;
                var _screenScroll = $('body')[0].scrollTop;
                //元素到顶部的距离
                var _eleTop = _eleOffsetTop - _screenScroll;
                var calcHeight = _eleHeight + _eleTop
                if(_eleTop > offset){
                    var move = _eleTop - offset + _screenScroll;
                    $('body')[0].scrollTop = move;
                }
            });
        }

    }
