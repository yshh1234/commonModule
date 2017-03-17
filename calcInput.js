/**
 *
 */
;(function ($, UP) {
    "use strict";
    UP.W = UP.W || {};
    // 常量
    UP.W.Calc = UP.W.Calc || {};
    var calc = UP.W.Calc;
    calc.data = {};
    calc.input = {};
    calc.container = [];
    calc.container_r = [];

    calc.addIput = function (option) {
        if (!$('.up-calc')[0]) {
            createCalc();
            saveDom();
            bindkey(option);
        }
        calc.data.status = 0;
        calc.data.temp_a = '';
        calc.data.temp_b = '';
        showCalc(option);
    }

//显示控件
    function showCalc(option) {
        $(option.input).on('click', function () {
            calc.directInput = option.input;
            addvalue(option);
            $('.up-calc').show();
            $('.up-mask').show();
        });
    }

//绑定事件
    /**calc.data.status
     * 0 init 1 plus 2 divid 3 mutl 4 sub 5 result
     * @param option
     */

    function bindkey(option) {
        var $container = $('.up-calc');
        //cancel
        $('.up-mask').on('click', function () {
            $('.up-calc').hide();
            $('.up-mask').hide();
        });
        //num
        $container.on('click', '[key]', function () {
            var _this = $(this);
            var key = $(this).attr('key');
            switch (key) {
                case 'cancel':
                    $('.up-calc').hide();
                    $('.up-mask').hide();
                    break;
                case 'confirm':
                    $(calc.directInput).val(calc.data.temp_a);
                    clearAll();
                    $('.up-calc').hide();
                    $('.up-mask').hide();
                    break;
                case 'plus':
                    calc.data.status = 1;
                    break;
                case 'divid':
                    calc.data.status = 2;
                    break;
                case 'mutl':
                    calc.data.status = 3;
                    break;
                case 'sub':
                    calc.data.status = 4;
                    break;
                case 'back':
                    break;
                case 'clear':
                    clearAll();
                    break;
                default:
                    if (calc.data.temp_b === '' && calc.data.status === 0) {
                        calc.data.temp_a += key;
                        if (key === '.' && calc.data.temp_a.indexOf('.') >= 0) {

                        }
                        $('.result').text(calc.data.temp_a);
                        return;
                    }
                    console.log(1);
            }
        });
        function clearAll() {
            var ini = 0;
            calc.directInput = null;
            $container.find('.result').text(ini.toFixed(option.fixed));
            calc.data.temp_a = '';
            calc.data.temp_b = '';
            calc.data.status = '';
        }
    }

//页面赋值
    function addvalue(option) {
        var rand = option.isRandom || false;
        var arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        if (rand) {
            //随机函数
            arr.sort(function () {
                return 0.5 - Math.random();
            });
        }
        for (var j = 0; j < 10; j++) {
            calc.container[j].text(arr[j]).attr('key', arr[j]);
            calc.container_r[j].text(arr[j]).attr('key', arr[j]);
        }
        $('.num_pan').show();
        $('.sign_pan').show();
        $('.ran_pan').hide();
    }

//建立dom
    function createCalc() {
        var str = '<div class="up-calc">' +
            '<div class="result_area">' +
            '<div class="result"></div>' +
            '</div>' +
            '<div class="calc_btn">' +
            '<div class="num_pan">' +
            '<div class="num_rol">' +
            '<div order_1></div>' +
            '<div order_2></div>' +
            '<div order_3></div>' +
            '</div>' +
            '<div class="num_rol">' +
            '<div order_4></div>' +
            '<div order_5></div>' +
            '<div order_6></div>' +
            '</div>' +
            '<div class="num_rol">' +
            '<div order_7></div>' +
            '<div order_8></div>' +
            '<div order_9></div>' +
            '</div>' +
            '<div class="num_rol">' +
            '<div order_10></div>' +
            '<div key=".">·</div>' +
            '<div key="cancel">取消</div>' +
            '</div>' +
            '</div>' +
            '<div class="sign_pan">' +
            '<div class="sign_rol">' +
            '<div key="plus">+</div>' +
            '<div key="divid">-</div>' +
            '<div key="mutl">X</div>' +
            '<div key="sub">/</div>' +
            '</div>' +
            '<div class="sign_rol">' +
            '<div key="back">←</div>' +
            '<div key="clear">C</div>' +
            '<div key="result">=</div>' +
            '<div key="confirm">确认</div>' +
            '</div>' +
            '</div>' +
            '<div class="ran_pan">' +
            '<div class="num_rol">' +
            '<div ran_1></div>' +
            '<div ran_2></div>' +
            '<div ran_3></div>' +
            '</div>' +
            '<div class="num_rol">' +
            '<div ran_4></div>' +
            '<div ran_5></div>' +
            '<div ran_6></div>' +
            '</div>' +
            '<div class="num_rol">' +
            '<div ran_7></div>' +
            '<div ran_8></div>' +
            '<div ran_9></div>' +
            '</div>' +
            '<div class="num_rol">' +
            '<div key="cancel">取消</div>' +
            '<div ran_10></div>' +
            '<div key="cancel">确认</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="up-mask">' +
            '</div>';
        $('body').append(str);
    }

    function saveDom() {
        for (var i = 1; i <= 11; i++) {
            calc.container[i - 1] = $('div[order_' + i + ']');
            calc.container_r[i - 1] = $('div[ran_' + i + ']');
        }
    }


    calc.sum = {
        addFuc: function (arg1, arg2) {
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        },
        minusFuc: function (arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            //last modify by deeka
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        plusFuc: function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        divideFuc: function (arg1, arg2) {
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
            }
            r1 = Math.Number(arg1.toString().replace(".", ""));
            r2 = Math.Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * Math.pow(10, t2 - t1);
        }
    };
})
(window.Zepto || window.jQuery, window.UP = window.UP || {});
