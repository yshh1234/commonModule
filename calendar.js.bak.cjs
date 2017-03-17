;(function (UP, win) {
    'use strict';
    //申明常量
    UP.W = UP.W || {};
    UP.W.Calendar = UP.W.Calendar || {};
    var calendar = UP.W.Calendar;
    calendar.util = calendar.util || {};
    calendar.data = calendar.data || {};
    calendar.main = calendar.main || {};
    var util = calendar.util;
    /**
     *
     * @param option
     */
    calendar.init = function (option) {
        //如果页面无控件dom 生成dom
        if (!util.getEl('.up-calendar')) {
            //设定root值
            util.resize(option);
            var root = calendar.main.root;
            //创建节点
            createDom();
            setStyle(option);
        }

        function createDom() {
            var domChild = document.createElement('div');
            domChild.className = 'up-calendar';
            var yearStr = '<div class="year"><div class="content"></div>';
            for (var i = option.startYear; i <= option.endYear; i++) {
                yearStr += '<div class="content" data-year="' + i + '">' + i + '</div>';
            }
            yearStr += '<div class="content"></div></div>';
            var monthStr = '<div class="month"><div class="content"></div>';
            for (var j = 1; j <= 12; j++) {
                monthStr += '<div class="content" data-month="' + j + '">' + j + '</div>';
            }
            monthStr += '<div class="content"></div></div>';
            var dayStr = '<div class="day"><div class="content"></div>';
            for (var k = 1; k <= 31; k++) {
                dayStr += '<div class="content" data-day="' + k + '">' + k + '</div>';
            }
            dayStr += '<div class="content"></div></div>';
            var hourStr = '<div class="hour"><div class="content"></div>';
            for (var l = 0; l < 24; l++) {
                hourStr += '<div class="content" data-hour="' + l + '">' + l + '</div>';
            }
            hourStr += '<div class="content"></div></div>';
            var minStr = '<div class="min"><div class="content"></div>';
            for (var m = 0; m < 60; m++) {
                minStr += '<div class="content" data-min="' + m + '">' + m + '</div>';
            }
            minStr += '<div class="content"></div></div>';
            var str = '<div class="header">' +
                '<div class="title">请选择时间和日期</div>' +
                '<div class="cancel"></div>' +
                '</div>' +
                '<div class="datetime">' +
                '<div class="pan">' +
                '<div class="datearea">' +
                yearStr +
                monthStr +
                dayStr +
                '</div>' +
                '<div class="timearea">' +
                hourStr +
                minStr +
                '</div>' +
                '</div>' +
                '<div class="line">' +
                '<div class="datearea">' +
                '<div class="year">' +
                '<div class="content"></div>' +
                '<div class="content"></div>' +
                '</div>' +
                '<div class="month">' +
                '<div class="content"></div>' +
                '<div class="content"></div>' +
                '</div>' +
                '<div class="day">' +
                '<div class="content"></div>' +
                '<div class="content"></div>' +
                '</div>' +
                '</div>' +
                '<div class="timearea">' +
                '<div class="hour">' +
                '<div class="content"></div>' +
                '<div class="content"></div>' +
                '</div>' +
                '<div class="min">' +
                '<div class="content"></div>' +
                '<div class="content"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="touch">' +
                '<div class="year"></div>' +
                '<div class="month"></div>' +
                '<div class="day"></div>' +
                '<div class="hour"></div>' +
                '<div class="min"></div>' +
                '</div>' +
                '</div>' +
                '<div class="footer">' +
                '<div class="today">今天</div>' +
                '<div class="confirm">确认</div>' +
                '</div>' +
                '<div class="mask"></div>';
            domChild.innerHTML = str;
            document.body.appendChild(domChild);
        }

        //设置样式高度
        function setStyle(option) {
            var _root = calendar.main.root;
            //标题
            document.querySelectorAll('.up-calendar .header')[0].style.cssText = 'height:'+_root + 'px;bottom:'+_root * 4.6 + 'px;';
            document.querySelectorAll('.up-calendar .header .title')[0].style.cssText= 'fontSize:'+parseInt(_root * 0.28) + 'px;line-height:'+_root + 'px;';
            document.querySelectorAll('.up-calendar .header .cancel')[0].style.cssText = 'width:' + _root + 'px;height:' + _root + 'px;';
            document.querySelectorAll('.up-calendar .footer')[0].style.cssText = 'height:' + _root * 1.6 + 'px;padding:' + _root * 0.4 + 'px;';
            document.querySelectorAll('.up-calendar .footer .today')[0].style.cssText = 'width:' + _root * 3.1 + 'px;height:' + _root * 0.8 + 'px;line-height:' + _root * 0.8 + 'px;font-size:' + _root * 0.34 + 'px;';
            document.querySelectorAll('.up-calendar .footer .confirm')[0].style.cssText = 'width:' + _root * 3.1 + 'px;height:' + _root * 0.8 + 'px;line-height:' + _root * 0.8 + 'px;font-size:' + _root * 0.34 + 'px;';
            var len = document.querySelectorAll('.up-calendar .content').length;
            for (var i = 0; i < len; i++) {
                document.querySelectorAll('.up-calendar .content')[i].style.cssText ='font-size:'+ parseInt(_root * 0.4) + 'px;height:'+_root + 'px;line-height:'+_root + 'px;';
            }
            if (option.datetime) {
                document.querySelectorAll('.up-calendar .datetime')[0].className = 'datetime';
                document.querySelectorAll('.up-calendar .datetime')[0].style.height = _root * 3 + 'px';
                document.querySelectorAll('.up-calendar .datetime')[0].style.bottom = _root * 1.6 + 'px';
                document.querySelectorAll('.up-calendar .header .title')[0].innerText = '请选择日期和时间';
            } else {
                document.querySelectorAll('.up-calendar .datetime')[0].className = 'date';
                document.querySelectorAll('.up-calendar .header .title')[0].innerText = '请选择日期';
            }
        }
    };
    //工具函数
    util = {
        //日期转json
        dateToJson: function (args) {
            if (typeof args !== 'string') {
                return null;
            }
            args = args.replace(/[^0-9]/g, "-");
            var jsonStr = {};
            jsonStr.year = args.split('-')[0];
            jsonStr.month = args.split('-')[0];
            jsonStr.day = args.split('-')[0];
            jsonStr.hour = args.split('-')[0];
            jsonStr.min = args.split('-')[0];
            return jsonStr;
        },
        //获取对象
        getEl: function (select) {
            if (document.querySelectorAll(select)[0]) {
                return document.querySelectorAll(select);
            }
            return false;
        },
        resize: function (option) {
            var timer = null;
            var rem = 12;
            var doc = win.document;
            var docEl = doc.documentElement;
            var visualWidth = option.visualWidth || 640;

            /**
             * 刷新页面REM值
             */
            function refreshRem() {
                var width = docEl.getBoundingClientRect().width;
                width = width > 768 ? visualWidth : width;
                rem = parseInt(width / (visualWidth / 100));
                calendar.main.root = rem;
            }

            /**
             * 页面缩放或重载时刷新REM
             */
            win.addEventListener('resize', function () {
                clearTimeout(timer);
                timer = setTimeout(refreshRem, 300);
            }, false);
            win.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    clearTimeout(timer);
                    timer = setTimeout(refreshRem, 300);
                }
            }, false);

            // 解决font-size过大导致间距不正常，必须指定body字号为12px
            if (doc.readyState === 'complete') {
                doc.body.style.fontSize = '12px';
            } else {
                doc.addEventListener('DOMContentLoaded', function (e) {
                    doc.body.style.fontSize = '12px';
                }, false);
            }
            refreshRem();
        }
    };


})(window.UP || {}, window);