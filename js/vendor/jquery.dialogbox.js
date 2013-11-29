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

(function($){
    $.alert = function(message){
        alert(message);
    }
    
    $.confirm = function(message){
        var r = confirm(message);
        if(r)
            return true;
        return false
    }
    
    $.prompt = function(message, value){
        return  prompt(message,value);
    }
        
})(jQuery);

$(function(){
    $("#alert").click(function(){
        $.alert("test");
        
        var r = $.confirm("Press a button");
        $.alert(r);
        
        var person=prompt("Please enter your name", "Harry Potter");
        if (person!=null){
          message = "Hello " + person + "! How are you today?";
          alert(message);
        }
        
    });
});