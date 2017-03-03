/**
 * Created by Administrator on 2017/2/21.
 */
function calendar(option) {
    this.init(option);
    window.activeEL = null;
    window.dateTmp = {};
}

calendar.prototype = {
    bigMonth: [1, 3, 5, 7, 8, 10, 12],
    smallMonth: [4, 6, 9, 11],
    monthlength: 0,
    init: function (option) {
        if (!option || option === {}) {
            return;
        }
        this.root = parseInt(document.querySelectorAll('html')[0].style.fontSize);
        this.DateHeight = this.root * 32 / 10 + 'px';
        if (!document.querySelectorAll('.calendar')[0]) {
            this.createCalendar(option);
        }
        this.bindKey(option);
        this.touchEvent(option);
    },
    createCalendar: function (option) {
        /**
         * 生成日历
         */
        if (!option._input || option._input === '') {
            return;
        }
        //年份
        var year_start = option.startYear;
        var year_end = option.endYear;
        var year_str = '<div class="calendar-content"></div>';
        var order = 0;
        for (var i = year_start; i <= year_end; i++) {
            year_str += '<div order="' + order + '"data-year = "' + i + '" class="calendar-content">' + i + '</div>';
            order++;
        }
        year_str += '<div class="calendar-content"></div>';
        order = 0;
        //月份
        var month_str = '<div class="calendar-content"></div>';
        for (var j = 1; j <= 12; j++) {
            month_str += '<div order="' + order + '" data-month="' + j + '" class="calendar-content">' + j + '</div>';
            order++;
        }
        month_str += '<div class="calendar-content"></div>';
        order = 0;
        //日期
        var day_str = '<div class="calendar-content"></div>';
        for (var m = 1; m <= 31; m++) {
            day_str += '<div order="' + order + '" data-day="' + m + '" class="calendar-content">' + m + '</div>';
            order++;
        }
        day_str += '<div class="calendar-content"></div>';
        order = 0;
        //小时
        var hour_str = '<div class="calendar-content"></div>';
        for (var k = 0; k < 24; k++) {
            hour_str += '<div order="' + order + '" data-hour="' + k + '" class="calendar-content">' + k + '</div>';
            order++;
        }
        hour_str += '<div class="calendar-content"></div>';
        order = 0;
        //小时
        var min_str = '<div class="calendar-content"></div>';
        for (var l = 0; l <= 59; l++) {
            min_str += '<div order="' + order + '" data-min="' + l + '" class="calendar-content">' + l + '</div>';
            order++;
        }
        min_str += '<div class="calendar-content"></div>';
        //生成页面
        var str = '<div class="calendar-bar">' +
            '<div class="calendar-cancel">取消</div>' +
            '<div class="calendar-confirm">确认</div>' +
            '</div>' +
            '<div class="calendar-date" id="calendar-date">' +
            //年份
            '<div class="calendar-year" id="calendar-year">' +
            year_str +
            '</div>' +
            '<div class="calendar-divide">' +
            '<div class="calendar-content"></div>' +
            '<div class="calendar-content">年</div>' +
            '<div class="calendar-content"></div>' +
            '</div>' +
            //月份
            '<div class="calendar-month" id="calendar-month">' +
            month_str +
            '</div>' +
            '<div class="calendar-divide">' +
            '<div class="calendar-content"></div>' +
            '<div class="calendar-content">月</div>' +
            '<div class="calendar-content"></div>' +
            '</div>' +
            //日期
            '<div class="calendar-day" id="calendar-day">' +
            day_str +
            '</div>' +
            '<div class="calendar-divide">' +
            '<div class="calendar-content"></div>' +
            '<div class="calendar-content">日</div>' +
            '<div class="calendar-content"></div>' +
            '</div>' +
            //小时
            '<div class="calendar-hour" id="calendar-hour">' +
            hour_str +
            '</div>' +
            '<div class="calendar-divide">' +
            '<div class="calendar-content"></div>' +
            '<div class="calendar-content">时</div>' +
            '<div class="calendar-content"></div>' +
            '</div>' +
            //分钟
            '<div class="calendar-min" id="calendar-min">' +
            min_str +
            '</div>' +
            '<div class="calendar-divide">' +
            '<div class="calendar-content"></div>' +
            '<div class="calendar-content">分</div>' +
            '<div class="calendar-content"></div>' +
            '</div>' +
            '<div class="calendar-line">' +
            '<div></div>' +
            '<div></div>' +
            '</div>' +
            '<div class="calendar-touch">' +
            '<div class="touch-year"></div>' +
            '<div class="touch-month"></div>' +
            '<div class="touch-day"></div>' +
            '<div class="touch-hour"></div>' +
            '<div class="touch-min"></div>' +
            '</div>' +
            '</div>';
        var cal = document.createElement('div');
        var mask = document.createElement('div');
        mask.setAttribute('class', 'calendar-mask');
        cal.setAttribute('class', 'calendar');
        cal.innerHTML = str;
        document.body.appendChild(cal);
        document.body.appendChild(mask);
        //如果不存在父节点则定义为body
        var target = document.getElementById(option._parent) || document.body;
        //重要！高度使用px配置
        document.querySelectorAll('.calendar-date')[0].style.height = this.DateHeight;
        var len = document.querySelectorAll('.calendar-content').length;
        for (var t = 0; t < len; t++) {
            document.querySelectorAll('.calendar-content')[t].style.height = this.root + 'px';
        }
    },
    bindEvent: function (element, event, callback) {
        if (typeof callback !== 'function') {
            return;
        }
        document.querySelectorAll(element)[0].addEventListener(event, function () {
            callback();
        }, false);
    },
    bindEventFP: function (parent, element, event, callback) {
        if (typeof callback !== 'function') {
            return;
        }
        document.querySelectorAll(parent)[0].addEventListener(event, function () {
            if (document.activeElement !== document.querySelectorAll(element)[0]) {
                return;
            }
            callback();
        }, false);
    },
    getNow: function () {
        var date = new Date();
        var dateSourt = {};
        dateSourt.year = date.getFullYear();
        dateSourt.month = date.getMonth() + 1;
        dateSourt.day = date.getDate();
        dateSourt.hour = date.getHours();
        dateSourt.min = date.getMinutes();
        return dateSourt;
    },
    bindKey: function (option) {
        var _this = this;
        //取消/退出
        this.bindEvent('.calendar-cancel', 'click', function () {
            document.querySelectorAll('.calendar')[0].style.display = 'none';
            document.querySelectorAll('.calendar-mask')[0].style.display = 'none';
            window.activeEL = null;
            window.dateTmp = {};
        });
        this.bindEvent('.calendar-mask', 'click', function () {
            document.querySelectorAll('.calendar')[0].style.display = 'none';
            document.querySelectorAll('.calendar-mask')[0].style.display = 'none';
            window.activeEL = null;
            window.dateTmp = {};
        });
        //确认按钮
        //显示日期控件
        var input = option._input;
        this.bindEventFP('body', input, 'click', function () {
            document.querySelectorAll('.calendar')[0].style.display = 'block';
            document.querySelectorAll('.calendar-mask')[0].style.display = 'block';
            //获取input内容并显示在控件内
            var input_str = document.querySelectorAll(option._input)[0].value;
            var dateData = _this.stringToJson(input_str);
            window.dateTmp = dateData;
            // console.log(option.startYear);
            var yearScroll = option.startYear - dateData.year;
            document.querySelectorAll('.calendar-year')[0].style.cssText = 'transform:translateY(' + yearScroll * _this.root + 'px)';
            var monthScroll = 1 - dateData.month;
            document.querySelectorAll('.calendar-month')[0].style.cssText = 'transform:translateY(' + monthScroll * _this.root + 'px)';
            if (_this.isInArray(_this.bigMonth, window.dateTmp.month)) {
                _this.monthlength = -30;
                document.querySelectorAll('.calendar-day div')[31].style.display = 'block';
                document.querySelectorAll('.calendar-day div')[30].style.display = 'block';
                document.querySelectorAll('.calendar-day div')[29].style.display = 'block';
            } else if (_this.isInArray(_this.smallMonth, window.dateTmp.month)) {
                _this.monthlength = -29;
                document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                document.querySelectorAll('.calendar-day div')[30].style.display = 'block';
                document.querySelectorAll('.calendar-day div')[29].style.display = 'block';
            } else {
                if (window.dateTmp.year % 4 === 0) {
                    _this.monthlength = -28;
                    document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                    document.querySelectorAll('.calendar-day div')[30].style.display = 'none';
                    document.querySelectorAll('.calendar-day div')[29].style.display = 'block';
                } else {
                    _this.monthlength = -27;
                    document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                    document.querySelectorAll('.calendar-day div')[30].style.display = 'none';
                    document.querySelectorAll('.calendar-day div')[29].style.display = 'none';
                }
            }
            var dayScroll = 1 - dateData.day;
            document.querySelectorAll('.calendar-day')[0].style.cssText = 'transform:translateY(' + dayScroll * _this.root + 'px)';
            var hourScroll = 0 - dateData.hour;
            document.querySelectorAll('.calendar-hour')[0].style.cssText = 'transform:translateY(' + hourScroll * _this.root + 'px)';
            var minScroll = 0 - dateData.min;
            document.querySelectorAll('.calendar-min')[0].style.cssText = 'transform:translateY(' + minScroll * _this.root + 'px)';
        });
        //确认提交
        this.bindEvent('.calendar-confirm', 'click', function () {
            document.querySelectorAll('.calendar')[0].style.display = 'none';
            document.querySelectorAll('.calendar-mask')[0].style.display = 'none';
            var str = window.dateTmp.year + '-' + window.dateTmp.month + '-' + window.dateTmp.day + ' ' + window.dateTmp.hour + ':' + window.dateTmp.min;
            document.querySelectorAll(option._input)[0].value = str;
            window.activeEL = null;
            window.dateTmp = {};
        });

    },
    stringToJson: function (str) {
        if (typeof str !== 'string') {
            return null;
        }
        var _arr = {};
        _arr.year = str.split(' ')[0].split('-')[0];
        _arr.month = str.split(' ')[0].split('-')[1];
        _arr.day = str.split(' ')[0].split('-')[2];
        _arr.hour = str.split(' ')[1].split(':')[0];
        _arr.min = str.split(' ')[1].split(':')[1];
        return _arr;

    },
    touchEvent: function (option) {
        var _this = this,
            ele = '',
            flg = false,
            _option = option,
            yearTouch = document.querySelectorAll('.touch-year')[0],
            monthTouch = document.querySelectorAll('.touch-month')[0],
            dayTouch = document.querySelectorAll('.touch-day')[0],
            hourTouch = document.querySelectorAll('.touch-hour')[0],
            minTouch = document.querySelectorAll('.touch-min')[0],
            initTouch,
            initDom = 0,
            move;
        //年份
        addEvent(yearTouch, 'touchstart', function () {
            touchStart('.calendar-year');
        });
        addEvent(yearTouch, 'touchmove', function () {
            touchMove('.calendar-year', _option);
        });
        addEvent(yearTouch, 'touchend', function () {
            touchEnd('.calendar-year', _option);
        });
        //月份
        addEvent(monthTouch, 'touchstart', function () {
            touchStart('.calendar-month');
        });
        addEvent(monthTouch, 'touchmove', function () {
            touchMove('.calendar-month', _option);
        });
        addEvent(monthTouch, 'touchend', function () {
            touchEnd('.calendar-month', _option);
        });
        //月份
        addEvent(dayTouch, 'touchstart', function () {
            touchStart('.calendar-day');
        });
        addEvent(dayTouch, 'touchmove', function () {
            touchMove('.calendar-day', _option);
        });
        addEvent(dayTouch, 'touchend', function () {
            touchEnd('.calendar-day', _option);
        });
        //小时
        addEvent(hourTouch, 'touchstart', function () {
            touchStart('.calendar-hour');
        });
        addEvent(hourTouch, 'touchmove', function () {
            touchMove('.calendar-hour', _option);
        });
        addEvent(hourTouch, 'touchend', function () {
            touchEnd('.calendar-hour', _option);
        });
        //分钟
        addEvent(minTouch, 'touchstart', function () {
            touchStart('.calendar-min');
        });
        addEvent(minTouch, 'touchmove', function () {
            touchMove('.calendar-min', _option);
        });
        addEvent(minTouch, 'touchend', function () {
            touchEnd('.calendar-min', _option);
        });
        //touch start
        function touchStart(dom) {
            ele = dom;
            flg = true;
            if (window.event.touches) {
                initTouch = window.event.touches[0].clientY;
            }
            initDom = parseInt(document.querySelectorAll(dom)[0].style.transform.replace('translateY(', '').replace('px)', ''));
        }

        function touchMove(dom, option) {
            if (!flg) {
                return;
            }
            var limit;
            if (dom === '.calendar-year') {
                limit = _this.root * (option.startYear - option.endYear);
            } else if (dom === '.calendar-month') {
                limit = _this.root * -11;
            } else if (dom === '.calendar-hour') {
                limit = _this.root * -23;
            } else if (dom === '.calendar-min') {
                limit = _this.root * -59;
            }
            var _Y = initDom + window.event.touches[0].clientY - initTouch;
            //二月
            if (dom === '.calendar-day') {
                if (_Y >= 0 || _Y <= _this.monthlength * _this.root) {
                    return;
                }
            }
            if (_Y >= 0 || _Y <= limit) {
                return;
            }
            document.querySelectorAll(dom)[0].style.cssText = 'transform:translateY(' + _Y + 'px)';
        }

        function touchEnd(dom) {
            var limit;
            var endDom = parseInt(document.querySelectorAll(dom)[0].style.transform.replace('translateY(', '').replace('px)', ''));
            var fixDom = Math.round(endDom / _this.root);
            var order = parseInt(1 - fixDom);
            var data;
            //年份
            if (dom === '.calendar-year') {
                data = document.querySelectorAll('.calendar-year div')[order].getAttribute('data-year');
                if (window.dateTmp.month === '02') {
                    if (data % 4 === 0) {
                        _this.monthlength = -28;
                        document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                        document.querySelectorAll('.calendar-day div')[30].style.display = 'none';
                        document.querySelectorAll('.calendar-day div')[29].style.display = 'block';
                    } else {
                        _this.monthlength = -27;
                        if (window.dateTmp.day >= 29) {
                            window.dateTmp.day = 28;
                            document.querySelectorAll('.calendar-day')[0].style.cssText = 'transform:translateY(' + (_this.root * -27) + 'px)';
                            setTimeout(function () {
                                document.querySelectorAll('.calendar-day div')[29].style.display = 'none';
                                document.querySelectorAll('.calendar-day div')[30].style.display = 'none';
                                document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                            }, 400);
                        } else {
                            document.querySelectorAll('.calendar-day div')[29].style.display = 'none';
                            document.querySelectorAll('.calendar-day div')[30].style.display = 'none';
                            document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                        }
                    }
                }
                window.dateTmp.year = data;
            } else if (dom === '.calendar-month') {
                data = document.querySelectorAll('.calendar-month div')[order].getAttribute('data-month');
                if (_this.isInArray(_this.bigMonth, data)) {
                    _this.monthlength = -30;
                    document.querySelectorAll('.calendar-day div')[31].style.display = 'block';
                    document.querySelectorAll('.calendar-day div')[30].style.display = 'block';
                    document.querySelectorAll('.calendar-day div')[29].style.display = 'block';
                } else if (_this.isInArray(_this.smallMonth, data)) {
                    _this.monthlength = -29;
                    if (window.dateTmp.day === 31) {
                        window.dateTmp.day = 30;
                        document.querySelectorAll('.calendar-day')[0].style.cssText = 'transform:translateY(' + (_this.root * -29) + 'px)';
                    }
                    document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                    document.querySelectorAll('.calendar-day div')[30].style.display = 'block';
                    document.querySelectorAll('.calendar-day div')[29].style.display = 'block';
                } else {
                    if (window.dateTmp.year % 4 === 0) {
                        _this.monthlength = -28;
                        if (window.dateTmp.day >= 30) {
                            window.dateTmp.day = 29;
                            document.querySelectorAll('.calendar-day')[0].style.cssText = 'transform:translateY(' + (_this.root * -28) + 'px)';
                        }
                        setTimeout(function () {
                            document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                            document.querySelectorAll('.calendar-day div')[30].style.display = 'none';
                            document.querySelectorAll('.calendar-day div')[29].style.display = 'block';
                        }, 300);
                    } else {
                        _this.monthlength = -27;
                        if (window.dateTmp.day >= 29) {
                            window.dateTmp.day = 28;
                            document.querySelectorAll('.calendar-day')[0].style.cssText = 'transform:translateY(' + (_this.root * -27) + 'px)';
                        }
                        setTimeout(function () {
                            document.querySelectorAll('.calendar-day div')[31].style.display = 'none';
                            document.querySelectorAll('.calendar-day div')[30].style.display = 'none';
                            document.querySelectorAll('.calendar-day div')[29].style.display = 'none';
                        }, 300);
                    }
                }
                if (data.length === 1) {
                    data = '0' + data;
                }
                window.dateTmp.month = data;
            } else if (dom === '.calendar-day') {
                data = document.querySelectorAll('.calendar-day div')[order].getAttribute('data-day');
                if (data.length === 1) {
                    data = '0' + data;
                }
                window.dateTmp.day = data;
            } else if (dom === '.calendar-hour') {
                data = document.querySelectorAll('.calendar-hour div')[order].getAttribute('data-hour');
                if (data.length === 1) {
                    data = '0' + data;
                }
                window.dateTmp.hour = data;
            } else if (dom === '.calendar-min') {
                data = document.querySelectorAll('.calendar-min div')[order].getAttribute('data-min');
                if (data.length === 1) {
                    data = '0' + data;
                }
                window.dateTmp.min = data;
            }

            fixDom = fixDom * _this.root;
            document.querySelectorAll(dom)[0].style.cssText = 'transform:translateY(' + fixDom + 'px)';
            ele = '';
            flg = false;
            initDom = 0;
        }

        /*事件监听 */
        function addEvent(el, type, fn) {
            if (el.addEventListener) {
                el.addEventListener(type, fn, false);
            } else if (el.attachEvent) {
                el.attachEvent('on' + type, fn);
            } else {
                el['on' + type] = fn;
            }
        }

        function stop(e) {
            //Opera/Chrome/FF
            if (e.preventDefault) {
                e.preventDefault();
            }
            //IE
            e.returnValue = false;
        }
    },
    /**数组*/
    isInArray: function (array, value) {
        var arr = new Array();
        arr = array;
        var alen = arr.length;
        var f = false;
        for (var z = 0; z < alen; z++) {
            if (parseInt(arr[z]) === parseInt(value)) {
                // console.log(arr[z]);
                f = true;
                break;
            }
        }
        return f;
    }
};

