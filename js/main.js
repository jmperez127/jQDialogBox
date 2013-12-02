$(function(){
    $("#alert").click(function(){
        $.dialogBox({
            message: "jQDialogBox Demo!",
            type: "info",
            popup: "alert",
            animationSpeed: 550
        });
    });
});