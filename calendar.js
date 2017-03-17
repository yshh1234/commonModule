/**
 * Created by YuanShengHui on 2017/2/21.
 * this plugin dependented on zepto/jquery resize.js
 * use as  UP.W.UP.W.Calendar.initCalendar({OPTION})
 * option params
 * input eg: .class #id
 * startYear eg:2010
 * endYear eg:2020
 * datetime eg:true/false
 */
;(function ($, UP) {
    "use strict";
    UP.W = UP.W || {};
    // 常量
    UP.W.Calendar = UP.W.Calendar || {};

    var calendar = UP.W.Calendar;
    calendar.ActiveEle = null;
    calendar.DateTmp = {};
    calendar.MoveEle = null;
    calendar.InitDom = 0;
    calendar.InitTouch = 0;
    calendar.Limit = 0;
    calendar.TouchActive = null;
    calendar.DateTime = {};
    calendar.initCalendar = function (option) {
        var bigMonth = [1, 3, 5, 7, 8, 10, 12];
        var smallMonth = [4, 6, 9, 11];
        var root = parseInt($('html').css('font-size'));
        init(option);

        function init(option) {
            if (!option.input || option.input === '' || !option.startYear || !option.endYear) {
                window.console.log('----日期参数未设置----');
                return;
            }
            calendar.DateTime[option.input.replace('#', '')] = option.datetime;
            //生成控件
            if (!$('.calendar')[0]) {
                createCalendar(option);
                bindEvent(option);
                bindInput(option);
            } else {
                bindInput(option);
            }
        }

        //创建控件
        function createCalendar(option) {
            //年份
            var year_start = option.startYear;
            var year_end = option.endYear;
            //年份
            var year_str = '<div class="calendar-content">&nbsp</div>';
            var order = 0;
            for (var i = year_start; i <= year_end; i++) {
                year_str += '<div order="' + order + '"data-year = "' + i + '" class="calendar-content">' + i + '</div>';
                order++;
            }
            year_str += '<div class="calendar-content">&nbsp</div>';
            order = 0;
            //月份
            var month_str = '<div class="calendar-content">&nbsp</div>';
            for (var j = 1; j <= 12; j++) {
                if (j < 10) {
                    month_str += '<div order="' + order + '" data-month="' + j + '" class="calendar-content">0' + j + '</div>';
                } else {
                    month_str += '<div order="' + order + '" data-month="' + j + '" class="calendar-content">' + j + '</div>';
                }
                order++;
            }
            month_str += '<div class="calendar-content">&nbsp</div>';
            order = 0;
            //日期
            var day_str = '<div class="calendar-content">&nbsp</div>';
            for (var m = 1; m <= 31; m++) {
                if (m < 10) {
                    day_str += '<div order="' + order + '" data-day="' + m + '" class="calendar-content">0' + m + '</div>';
                } else {
                    day_str += '<div order="' + order + '" data-day="' + m + '" class="calendar-content">' + m + '</div>';
                }
                order++;
            }
            day_str += '<div class="calendar-content">&nbsp</div>';
            order = 0;
            //小时
            var hour_str = '<div class="calendar-content">&nbsp</div>';
            for (var k = 0; k < 24; k++) {
                if (k < 10) {
                    hour_str += '<div order="' + order + '" data-hour="' + k + '" class="calendar-content">0' + k + '</div>';
                } else {
                    hour_str += '<div order="' + order + '" data-hour="' + k + '" class="calendar-content">' + k + '</div>';
                }
                order++;
            }
            hour_str += '<div class="calendar-content">&nbsp</div>';
            order = 0;
            //小时
            var min_str = '<div class="calendar-content">&nbsp</div>';
            for (var l = 0; l <= 59; l++) {
                if (l < 10) {
                    min_str += '<div order="' + order + '" data-min="' + l + '" class="calendar-content">0' + l + '</div>';
                } else {
                    min_str += '<div order="' + order + '" data-min="' + l + '" class="calendar-content">' + l + '</div>';
                }
                order++;
            }
            min_str += '<div class="calendar-content">&nbsp</div>';
            //生成页面
            var str =
                '<div class="calendar">' +
                '<div class="calendar-title">' +
                '<div class="calendar-title-content">请选择时间和日期</div>' +
                '<div class="calendar-cancel"></div>' +
                '</div>' +
                '<div class="calendar-datecontainer calendar-datetime" id="calendar-date">' +
                //年份
                '<div class="calendar-year" id="calendar-year">' +
                year_str +
                '</div>' +
                //月份
                '<div class="calendar-month" id="calendar-month">' +
                month_str +
                '</div>' +
                //日期
                '<div class="calendar-day" id="calendar-day">' +
                day_str +
                '</div>' +
                //小时
                '<div class="calendar-hour" id="calendar-hour">' +
                hour_str +
                '</div>' +
                //分钟
                '<div class="calendar-min" id="calendar-min">' +
                min_str +
                '</div>' +
                '<div class="calendar-line">' +
                '<div class="calendar-line-divide"></div>' +
                '<div class="calendar-line-date">' +
                '<div class="calendar-line-year">' +
                '<div class="calendar-line-reddivide"></div>' +
                '<div class="calendar-line-reddivide"></div>' +
                '</div>' +
                '<div class="calendar-line-month">' +
                '<div class="calendar-line-reddivide"></div>' +
                '<div class="calendar-line-reddivide"></div>' +
                '</div>' +
                '<div class="calendar-line-day">' +
                '<div class="calendar-line-reddivide"></div>' +
                '<div class="calendar-line-reddivide"></div>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-line-time">' +
                '<div class="calendar-line-hour">' +
                '<div class="calendar-line-reddivide"></div>' +
                '<div class="calendar-line-reddivide"></div>' +
                '</div>' +
                '<div class="calendar-line-sigma">' +
                '<div></div>' +
                '<div>：</div>' +
                '</div>' +
                '<div class="calendar-line-min">' +
                '<div class="calendar-line-reddivide"></div>' +
                '<div class="calendar-line-reddivide"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-touch">' +
                '<div class="touch-year"></div>' +
                '<div class="touch-month"></div>' +
                '<div class="touch-day"></div>' +
                '<div class="touch-hour"></div>' +
                '<div class="touch-min"></div>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-bar">' +
                '<button class="calendar-today">今天</button>' +
                '<button class="calendar-confirm">确认</button>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-mask"></div>';
            $('body').append(str);
            //如果不存在父节点则定义为body
            var target = document.getElementById(option.parent) || document.body;
            //重要！高度使用px配置
            $('.calendar-date').height(root * 32 / 10);
            var len = document.querySelectorAll('.calendar-content').length;
            for (var z = 0; z < len; z++) {
                document.querySelectorAll('.calendar-content')[z].style.height = root + 'px';
            }
        }

        //input绑定事件
        function bindInput(option) {

            //输入控件按键点击事件
            $('body').on('click', option.input, function () {
                var _input = $(option.input);
                calendar.ActiveEle = this.id;
                calendar.DateTmp = stringToJson($(option.input).val());
                var template = stringToJson($(option.input).val());
                var yearScroll = option.startYear - template.year;
                $('.calendar-year').css('transform', 'translateY(' + yearScroll * root + 'px)');
                $('.calendar-year').css('-webkit-transform', 'translateY(' + yearScroll * root + 'px)');
                var monthScroll = 1 - template.month;
                $('.calendar-month').css('transform', 'translateY(' + monthScroll * root + 'px)');
                $('.calendar-month').css('-webkit-transform', 'translateY(' + monthScroll * root + 'px)');
                if ($.inArray(parseInt(calendar.DateTmp.month), bigMonth) >= 0) {
                    calendar.Limit = -30;
                    showDays(0);
                } else if ($.inArray(parseInt(calendar.DateTmp.month), smallMonth) >= 0) {
                    calendar.Limit = -29;
                    showDays(1);
                } else {
                    if (calendar.DateTmp.year % 4 === 0) {
                        calendar.Limit = -28;
                        showDays(2);
                    } else {
                        calendar.Limit = -27;
                        showDays(3);
                    }
                }
                var dayScroll = 1 - template.day;
                $('.calendar-day').css('transform', 'translateY(' + dayScroll * root + 'px)');
                $('.calendar-day').css('-webkit-transform', 'translateY(' + dayScroll * root + 'px)');
                if (calendar.DateTime[calendar.ActiveEle]) {
                    $('.calendar-title-content').html('请选择日期和时间');
                    $('.calendar-datecontainer').removeClass('calendar-date').addClass('calendar-datetime');
                    var hourScroll = 0 - template.hour;
                    $('.calendar-hour').css('transform', 'translateY(' + hourScroll * root + 'px)');
                    $('.calendar-hour').css('-webkit-transform', 'translateY(' + hourScroll * root + 'px)');
                    var minScroll = 0 - template.min;
                    $('.calendar-min').css('transform', 'translateY(' + minScroll * root + 'px)');
                    $('.calendar-min').css('-webkit-transform', 'translateY(' + minScroll * root + 'px)');
                } else {
                    $('.calendar-title-content').html('请选择日期');
                    $('.calendar-datecontainer').removeClass('calendar-datetime').addClass('calendar-date');
                }

                $('.calendar-mask').show();
                $('.calendar').show();
            });
        }

        //绑定事件
        function bindEvent(option) {
            //取消事件
            $('.calendar').on('click', '.calendar-cancel', function () {
                $('.calendar').hide();
                $('.calendar-mask').hide();
                calendar.ActiveEle = null;
                calendar.DateTmp = {};
            });
            $('.calendar-mask').on('click', function () {
                $('.calendar').hide();
                $('.calendar-mask').hide();
                calendar.ActiveEle = null;
                calendar.DateTmp = {};
            });
            //确认提交事件
            $('.calendar').on('click', '.calendar-today', function () {
                var date = new Date();
                var str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                if (calendar.DateTime[calendar.ActiveEle]) {
                    str = str + ' ' + date.getHours() + ':' + date.getMinutes();
                }
                $('#' + calendar.ActiveEle).val(str);
                $('.calendar').hide();
                $('.calendar-mask').hide();
                calendar.ActiveEle = null;
                calendar.DateTmp = {};
            });
            //确认提交事件
            $('.calendar').on('click', '.calendar-confirm', function () {
                var str = calendar.DateTmp.year + '-' + calendar.DateTmp.month + '-' + calendar.DateTmp.day;
                if (calendar.DateTime[calendar.ActiveEle]) {
                    str = str + ' ' + calendar.DateTmp.hour + ':' + calendar.DateTmp.min;
                }
                $('#' + calendar.ActiveEle).val(str);
                $('.calendar').hide();
                $('.calendar-mask').hide();
                calendar.ActiveEle = null;
                calendar.DateTmp = {};
            });
            //滑动事件
            touchEvent('.calendar-year', '.touch-year');
            touchEvent('.calendar-month', '.touch-month');
            touchEvent('.calendar-day', '.touch-day');
            touchEvent('.calendar-hour', '.touch-hour');
            touchEvent('.calendar-min', '.touch-min');

            function touchEvent(element, bindElement) {
                //touch start
                $('body').on('touchstart', bindElement, function () {
                    calendar.TouchActive = bindElement;
                    calendar.MoveEle = element;
                    $(element).removeClass('calendar-animate');
                    calendar.startTime = window.event.timeStamp || Date.now();
                    if (window.event.touches) {
                        calendar.InitTouch = window.event.touches[0].clientY;
                    }
                    calendar.InitDom = $(element).css('transform') || $(element).css('-webkit-transform');
                    calendar.InitDom = parseInt(calendar.InitDom.replace('translateY(', '').replace('px)', ''));
                });

                //touch move
                $('body').on('touchmove', bindElement, function () {

                    if (calendar.TouchActive !== bindElement) {
                        return;
                    }
                    var limit;
                    if (element === '.calendar-year') {
                        limit = root * (option.startYear - option.endYear);
                    } else if (element === '.calendar-month') {
                        limit = root * -11;
                    } else if (element === '.calendar-hour') {
                        limit = root * -23;
                    } else if (element === '.calendar-min') {
                        limit = root * -59;
                    }
                    calendar.tMove = window.event.touches[0].clientY - calendar.InitTouch;
                    var _Y = calendar.InitDom + calendar.tMove;
                    //二月
                    if (element === '.calendar-day') {
                        if (_Y >= 0 || _Y <= calendar.Limit * root) {
                            return;
                        }
                    }
                    if (_Y >= 0 || _Y <= limit) {
                        return;
                    }
                    $(element).css('transform', 'translateY(' + _Y + 'px)');
                    $(element).css('-webkit-transform', 'translateY(' + _Y + 'px)');
                });
                //touch end
                $('body').on('touchend', bindElement, function () {
                        var data;
                        var endDom = $(element).css('transform') || $(element).css('-webkit-transform');
                        endDom = parseInt(endDom.replace('translateY(', '').replace('px)', ''));
                        var time = window.event.timeStamp || Date.now();
                        time = parseInt(time - calendar.startTime);
                        if (time < 300) {
                            //判定方向
                            if (endDom < calendar.InitDom) {
                                //向上滚动
                                endDom = endDom - root * 200 / time;
                            } else if (endDom > calendar.InitDom) {
                                //向下滚动
                                endDom = endDom + root * 200 / time;
                            } else {
                                //没变化
                                return;
                            }
                        }
                        var order = parseInt(1 - Math.round(endDom / root));
                        var maxorder = $(element).children().length - 2;
                        if (element === '.calendar-day') {
                            if (parseInt(calendar.DateTmp.month) === 2) {
                                if (parseInt(calendar.DateTmp.year) % 4 === 0) {
                                    maxorder = maxorder - 2;
                                } else {
                                    maxorder = maxorder - 3;
                                }
                            }
                        }
                        if (order <= 1) {
                            order = 1;
                        } else if (order >= maxorder) {
                            order = maxorder;
                        }
                        endDom = 0 - (order - 1) * root;
                        if (calendar.TouchActive !== bindElement) {
                            return;
                        }
                        //年份
                        if (element === '.calendar-year') {
                            data = $('.calendar-year div')[order].getAttribute('data-year');
                            calendar.DateTmp.year = data;
                            if (parseInt(calendar.DateTmp.month) === 2) {
                                if (parseInt(calendar.DateTmp.year) % 4 === 0) {
                                    if (parseInt(calendar.DateTmp.day) >= 30) {
                                        calendar.DateTmp.day = '29';
                                        $('.calendar-day').css('transform', 'translateY(' + root * -28 + 'px)');
                                        $('.calendar-day').css('-webkit-transform', 'translateY(' + root * -28 + 'px)');
                                    }
                                    showDays(2);
                                } else {
                                    if (parseInt(calendar.DateTmp.day) >= 29) {
                                        calendar.DateTmp.day = '28';
                                        $('.calendar-day').css('transform', 'translateY(' + root * -27 + 'px)');
                                        $('.calendar-day').css('-webkit-transform', 'translateY(' + root * -27 + 'px)');
                                    }
                                    showDays(3);
                                }
                            }
                        } else if (element === '.calendar-month') {
                            data = parseInt($('.calendar-month div')[order].getAttribute('data-month'));
                            if ($.inArray(data, bigMonth) >= 0) {
                                showDays(0);
                            } else if ($.inArray(data, smallMonth) >= 0) {
                                if (parseInt(calendar.DateTmp.day) === 31) {
                                    calendar.DateTmp.day = '30';
                                    $('.calendar-day').css('transform', 'translateY(' + root * -29 + 'px)');
                                    $('.calendar-day').css('-webkit-transform', 'translateY(' + root * -29 + 'px)');
                                }
                                showDays(1);
                            } else {
                                if (parseInt(calendar.DateTmp.year) % 4 === 0) {
                                    if (parseInt(calendar.DateTmp.day) >= 30) {
                                        calendar.DateTmp.day = '29';
                                        $('.calendar-day').css('transform', 'translateY(' + root * -28 + 'px)');
                                        $('.calendar-day').css('-webkit-transform', 'translateY(' + root * -28 + 'px)');
                                    }
                                    showDays(2);
                                } else {
                                    if (parseInt(calendar.DateTmp.day) >= 29) {
                                        calendar.DateTmp.day = '28';
                                        $('.calendar-day').css('transform', 'translateY(' + root * -27 + 'px)');
                                        $('.calendar-day').css('-webkit-transform', 'translateY(' + root * -27 + 'px)');
                                    }
                                    showDays(3);
                                }
                            }
                            if (data < 10) {
                                data = '0' + data;
                            }
                            calendar.DateTmp.month = data;
                        } else if (element === '.calendar-day') {
                            data = $('.calendar-day div')[order].getAttribute('data-day');
                            if (data < 10) {
                                data = '0' + data;
                            }
                            calendar.DateTmp.day = data;
                        } else if (element === '.calendar-hour') {
                            data = parseInt($('.calendar-hour div')[order].getAttribute('data-hour'));
                            if (data < 10) {
                                data = '0' + data;
                            }
                            calendar.DateTmp.hour = data;
                        } else if (element === '.calendar-min') {
                            data = $('.calendar-min div')[order].getAttribute('data-min');
                            if (data < 10) {
                                data = '0' + data;
                            }
                            calendar.DateTmp.min = data;
                        }
                        $(element).addClass('calendar-animate');
                        $(element).css('transform', 'translateY(' + endDom + 'px)');
                        $(element).css('-webkit-transform', 'translateY(' + endDom + 'px)');
                        calendar.MoveEle = null;
                        calendar.InitTouch = 0;
                        calendar.InitDom = 0;
                        calendar.startTime = 0;
                        calendar.down = false;
                    }
                );
            }
        }

        //显示不同的日总数
        function showDays(sum) {
            $('.calendar-day div')[31].style.display = 'block';
            $('.calendar-day div')[30].style.display = 'block';
            $('.calendar-day div')[29].style.display = 'block';
            var _sum = 32 - sum;
            for (var i = _sum; i <= 31; i++) {
                $('.calendar-day div')[i].style.display = 'none';
            }
        }

        //日期转json对象
        function stringToJson(str) {
            if (typeof str !== 'string') {
                return null;
            }
            var _arr = {};
            _arr.year = str.split(' ')[0].split('-')[0];
            _arr.month = str.split(' ')[0].split('-')[1];
            _arr.day = str.split(' ')[0].split('-')[2];
            if (str.split(' ')[1]) {
                _arr.hour = str.split(' ')[1].split(':')[0];
                _arr.min = str.split(' ')[1].split(':')[1];
            }
            return _arr;

        }

    };
})
(window.Zepto || window.jQuery, window.UP = window.UP || {});