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
    
    var utils = {
        prepareCss: function(template){
            
            var content = template.content;
            
            var width = content.css("width");
            var padding = content.css("padding");
            var marginLeft = parseFloat(width) / 2;
            console.log(marginLeft+"px");
            content.css("margin-left", "-"+marginLeft+"px");
            
        },
        
        animateDialog: function(template, speed){
            
            if(typeof(speed) === "undefined")
                speed = 650;
            //speed = 500;
            
            if(speed > 1000)
                speed = 1000;
            
            var top = parseFloat(template.content.css("top"));
            var halfTop = parseFloat(template.content.css("top")) / 2;
            var content = template.content;
            
            content.css("top","-"+halfTop+"px");
            
            var offset = speed/8; //TODO define a better way to determine the animation offset
            
            content.animate(
               {
                top: top+offset, 
                opacity: 1,
                
               }, speed, function(){
                    content.animate({top: top}, speed/2);  
            });
        }
    }
    
    var dialogMethods = {
		alert: function(settings){
            var template = settings.template;
            template.content.text(settings.message);
           
            
            if($("#"+template.overlay.id).length === 0)
                $("body").prepend(template.overlay);
            
            
            template.overlay.fadeIn();
            template.overlay.append(template.content);
            
            utils.animateDialog(template, settings.animationSpeed);
                    
            utils.prepareCss(template);
		},

		confirm: function(){
			//TODO FUNCTIONALITY
		},

		prompt: function(){
			//TODO FUNCTIONALITY
		}
        
	}
    
    $.dialogBox = function(options){
        var settings = {};
        
        if(typeof(options) == "object")
		  $.extend(settings, this.dialogBox.defaults, options);
        else if(typeof(options) == "string"){ //only a string parameter, then it's a message
            $.extend(settings, this.dialogBox.defaults);
            settings.message = options;
        }
        
        if(dialogMethods[settings.popup]){
			
           var args = new Array(settings);
           dialogMethods[settings.popup].apply(this, args);
		} 
		 else{
			$.error("Popup " + settings.popup + " does not exist on jQDialogBox");
		}
    }
      
    $.dialogBox.defaults = {
        type: "info",
        popup: "alert",
        message: "message",
        animationSpeed: 650,
        template: { 
                    overlay: 
                        $('<div/>')
                        .attr("id", "dialog-overlay")
                        .addClass("overlay"),
            
                    content: $('<div/>')
                        .attr("id", "dialog-box")
                        .addClass("dialog-box"),
                   }
	}
     
})(jQuery);
