/* 
    javascript popup boxes
    -Alert Box:
        alert("message");
        
    -Confirm Box:
        var r = confirm("Press a button");
        if (r==true){
          x="You pressed OK!";
        }
        else {
          x="You pressed Cancel!";
        }
        
    -Prompt Box:
        var person=prompt("Please enter your name","Harry Potter");
        if (person!=null){
          message = "Hello " + person + "! How are you today?";
          alert(message);
        }
*/
(function ($) {

    //Dialog Builder Util

    var dialogBuilder = {

        //Css element calculations
        prepareCss: function (template) {

            var dialogBox = template.box;
            dialogBox.css("top", "50%");

            var height = dialogBox.height();
            var width = dialogBox.css("width");
            var top = dialogBox.css("top");
            var padding = dialogBox.css("padding");
            var marginLeft = parseFloat(width) / 2;
            var marginTop = parseFloat(height) / 2;

            dialogBox.css({
                "margin-left": "-" + marginLeft + "px",
                "margin-top": "-" + marginTop + "px",
            });
        },

        animateDialog: function (template, speed, reverseAnimation) {

            reverseAnimation === "undefined" ? false : true;
            speed = typeof (speed) === "undefined" ? 650 : speed;
            speed = speed > 1000 ? 1000 : speed;

            var dialogBox = template.box;
            var top = parseFloat(template.box.css("top"));
            var halfTop = parseFloat(template.box.css("top")) / 2;
            var height = parseFloat(template.box.css("height"));
            var topWithOffset = top + (speed / 8); //TODO define a better way to determine the animation offset

            if (reverseAnimation) {

                dialogBox.animate({
                    top: topWithOffset,
                    opacity: 1,

                }, speed / 2, function () {
                    dialogBox.animate({
                        top: -height
                    }, speed, function () {
                        dialogBox.removeAttr("style");
                    });
                });
            } else {
                dialogBox.css("top", "-" + halfTop + "px");
                dialogBox.animate({
                    top: topWithOffset,
                    opacity: 1,

                }, speed, function () {
                    dialogBox.animate({
                        top: top
                    }, speed / 2);
                });
            }


        },

        buildDialogBox: function (template, settings) {
            template.overlay.fadeIn();
            template.overlay.append(template.box);
            template.box.text(settings.message);
            template.box.append(template.closeButton);

        },

        bindEvents: function (template, settings) {
            template.closeButton.click(function () {
                dialogBuilder.animateDialog(template, settings.animationSpeed, true);
                template.overlay.fadeOut(settings.animationSpeed * 2);
            });

            $(window).resize(function () { //TODO fix for better screen adaptive results
                dialogBuilder.prepareCss(template);
            });

        },

        build: function (template, settings) {
            dialogBuilder.buildDialogBox(template, settings);
            dialogBuilder.animateDialog(template, settings.animationSpeed);
            dialogBuilder.prepareCss(template);
            dialogBuilder.bindEvents(template, settings);
        }
    }

    //Plgun methods

    var dialogMethods = {
        alert: function (settings) {
            var template = settings.template;

            if ($("#" + template.overlay.id).length === 0)
                $("body").prepend(template.overlay);

            dialogBuilder.build(template, settings);

        },

        confirm: function () {
            //TODO FUNCTIONALITY
        },

        prompt: function () {
            //TODO FUNCTIONALITY
        }

    }

    //Init

    $.dialogBox = function (options) {
        var settings = {};

        if (typeof (options) == "object")
            $.extend(settings, this.dialogBox.defaults, options);

        else if (typeof (options) == "string") { //only a string parameter, then it's a message
            $.extend(settings, this.dialogBox.defaults);
            settings.message = options;
        }

        if (dialogMethods[settings.popup]) {

            var args = new Array(settings);
            dialogMethods[settings.popup].apply(this, args);
        } else {
            $.error("Popup " + settings.popup + " does not exist on jQDialogBox");
        }
    }

    $.dialogBox.defaults = {
        type: "info",
        popup: "alert",
        message: "message",
        animationSpeed: 650,
        template: {
            overlay: $('<div/>')
                .attr("id", "dialog-overlay")
                .addClass("overlay"),

            box: $('<div/>')
                .attr("id", "dialog-box")
                .addClass("dialog-box"),

            closeButton: $('<div/>')
                .attr("id", "close-dialog-box")
                .addClass("close-dialog-box"),
        }
    }

})(jQuery);