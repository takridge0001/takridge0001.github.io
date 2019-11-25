$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}

function addNeverZero (num, add) {
    num = parseInt(num) + add;
    if (num < 0) { return 0; }
    return num;
}

function calculateMeter() {
    var used = parseInt($("#cornqty").text()) + parseInt($("#queenqty").text()) + parseInt($("#carrotqty").text()) / 20 +
    parseInt($("#garlicqty").text()) / 3 + parseInt($("#redqty").text()) / 2 + parseInt($("#yellowqty").text()) / 2 +
    parseInt($("#whiteqty").text()) / 2;

    console.log(used);

    var total = parseInt($.urlParam("number")) * parseInt($.urlParam("length"));

    console.log(total);

    $("#meter").attr('value', used/total*100);
}

$(document).ready(function() {
    $("button:contains('+')").click(function() {
        var input = $(this).prevAll('input');
        if ($.isNumeric(input.val())) {
            input.val(addNeverZero(input.val(), 1));
        }
    });
    
    $("button:contains('-')").click(function() {
        var input = $(this).nextAll('input');
        if ($.isNumeric(input.val())) {
            input.val(addNeverZero(input.val(), -1));
        }
    });
    
    $("input[type='checkbox']").change(function() {
        var id = $(this).attr('id');
        var checked = $(this).is(':checked');

        $("div[class*=' " + id + "']").each(function() {
            if (checked) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $("button[class*='add']").click(function() {
        var input = $(this).prevAll('input');
        if (input.val() == '0') { return; }
        var name = input.attr('name');
        $("#" + name).parent().parent().parent().parent().show();
        $("#" + name).text(input.val());
        $("#truck").show();
        input.val('0');
        calculateMeter();
    });

    $("i[class*='fa-trash']").click(function() {
        $(this).parent().prev().find('span').text('0');
        $(this).parent().parent().parent().hide();

        if ($("#cornqty").text() == '0' && $("#queenqty").text() == '0' && $("#carrotqty").text() == '0' && $("#garlicqty").text() == '0' &&
            $("#redqty").text() == '0' && $("#yellowqty").text() == '0' && $("#whiteqty").text() == '0') {
            $("#truck").hide();
        }

        calculateMeter();
    });
});