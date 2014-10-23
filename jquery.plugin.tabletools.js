;(function($) {

$.fn.extend({
});

$.TableTools = function(tbody, options) {
    var $tbody = $(tbody);
    options = $.extend({}, $.TableTools.defaults, options);
    var shiftDown = false;
    var shift1 = -1, shift2 = -1;

    // �б���ɫ����
    if (options.cross) {
        $tbody.children('tr:even').addClass(options.evenClass);
        $tbody.children('tr:odd').addClass(options.oddClass);
    }

    // ��껬���б�ɫ
    if (options.over) {
        $tbody.children('tr').mouseover( function() {
            $(this).addClass(options.overClass);
        }).mouseout( function() {
            $(this).removeClass(options.overClass);
        });
    }

    // checkboxѡ����Ӧ�б�ɫ
    if (options.selected) {
        var $boxs = $tbody.find(options.checkbox);
        $boxs.click(function(event) {
            var $box = $(this);
            if ($box.prop('checked')) {
                $box.parents('tr').removeClass(options.clickedTrClass).addClass(options.selectedClass);
                // Shiftѡ��Ĵ���
                if (shiftDown) {
                    if (shift1 == -1) {
                        shift1 = $boxs.index($box);
                    } else if (shift2 == -1) {
                        shift2 = $boxs.index($box);
                        if (shift2 >= shift1) {
                            $boxs.slice(shift1, shift2).prop('checked', true).parents('tr').removeClass(options.clickedTrClass).addClass(options.selectedClass);
                        } else {
                            $boxs.slice(shift2, shift1).prop('checked', true).parents('tr').removeClass(options.clickedTrClass).addClass(options.selectedClass);
                        }
                    }
                }
            } else {
                $box.parents('tr').removeClass(options.clickedTrClass).removeClass(options.selectedClass);
            }
            event.stopPropagation();
        });
    }

    // ȫѡ��ť
    if (options.checkAll) {
        $(options.checkAllBox).click(function() {
            var $boxs = $tbody.find(options.checkbox);
            var checked = $(this).prop('checked');
            $boxs.prop('checked', checked);
            if (options.selected) {
                if (checked) {
                    $boxs.parents('tr').removeClass(options.clickedTrClass).addClass(options.selectedClass);
                } else {
                    $boxs.parents('tr').removeClass(options.clickedTrClass).removeClass(options.selectedClass);
                }
            }
        });
    }

    // ѡ����ѡ��checkbox
    if (options.clickTr) {
        $tbody.find('tr').click(function() {
            var $clickedTr = $(this);
            if (options.clickedTrChecked) {
                if ($clickedTr.hasClass(options.selectedClass)) {
                    $clickedTr.removeClass(options.selectedClass).find(options.checkbox).prop('checked', false);
                } else {
                    $clickedTr.addClass(options.selectedClass).find(options.checkbox).prop('checked', true);
                }
            } else {
                if (!$clickedTr.hasClass(options.selectedClass)) {
                    if ($clickedTr.hasClass(options.clickedTrClass)) {
                        $clickedTr.removeClass(options.clickedTrClass);
                    } else {
                        $clickedTr.addClass(options.clickedTrClass);
                    }
                }
            }
        });
    }

    // Shift��ť����
    $(document).keydown(function(e){
        switch(e.keyCode){
            case 16:
                shiftDown = true;
                break;
            default:
                break;
        }
    }).keyup(function(e){
        switch(e.keyCode){
            case 16:
                shiftDown = false;
                shift1 = -1;
                shift2 = -1;
                break;
            default:
                break;
        }
    });
};

// Ĭ������
$.TableTools.defaults = {
    cross: false,
    evenClass: "even",
    oddClass: "odd",

    over: false,
    overClass: "over",

    selected: false,
    selectedClass: "selected",
    checkbox: "td > input:checkbox",

    checkAll: false,
    checkAllBox: "#check_all",

    clickTr: false,
    clickedTrClass: "clicked",
    clickedTrChecked: false
};

})(jQuery);