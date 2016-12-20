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
        
    /**
     * IOS输入控件覆盖问题解决
     * @param ele 控制的input元素
     * @param isfixed input元素的父级/本身是否fixed
     */
    util.inputScrollTop = function (ele, isfixed) {
        (function(_ele, _isfixed){
            //当前元素
            var _this = $(_ele);
            if (UP.W.Env.isIOS && UP.W.Env.isInsideWalletApp) {
                _this.on('focus', function () {
                    //添加绑定事件
                    setTimeout(function () {
                        //当前body滚动标度
                        var parentEleScrollTop = document.body.scrollTop;
                        //需要滚动的实际标度
                        var scroll = _this.offset().top + parseInt(_this.css('height')) - document.body.clientHeight + 318;
                        //元素高于输入框则不滚动
                        if (parentEleScrollTop >= scroll) {
                            return;
                        }
                        //是否fixed
                        if (_isfixed) {
                            scroll = document.body.scrollTop + 318;
                        }
                        document.body.scrollTop = scroll;
                    }, 300);
                });
            }
        })(ele, isfixed);
    }
    }
