$(function(){
    $("#alert").click(function(){
        $.dialogBox({
            message: "Test with objects",
            type: "info",
            popup: "alert",
            animationSpeed: 550
        });
    });
});