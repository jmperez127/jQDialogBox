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
    
    var methods = {
		alert: function(settings){
            var template = settings.template;
            template.text(settings.message);
            
            if($("#"+template.id).length === 0)
                $("body").append(settings.template);
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
        
        if(methods[settings.popup]){
			
           var args = new Array(settings);
           methods[settings.popup].apply(this, args);
		} 
		 else{
			$.error("Popup " + settings.popup + " does not exist on jQDialogBox");
		}
    }
      
    $.dialogBox.defaults = {
        type: "info",
        popup: "alert",
        message: "message",
        template: $('<div/>')
                        .attr("id", "dialog-box")
                        .addClass("dialog")
                        .text("{{{message}}}")
	}
     
})(jQuery);
