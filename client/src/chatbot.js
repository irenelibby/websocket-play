(function () {
    var W3CWebSocket = require('websocket').w3cwebsocket;
    var ws = new W3CWebSocket('ws://localhost:8181/', 'echo-protocol');
    
    var recognition = new (webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    var showTextBubble = function(text, position) {
        $(".bubble-screen").append('<div class="speech-bubble speech-'+position+'">'+text+'</div>');
    }

    ws.onerror = function() {
        console.log('Connection Error');
    };
     
    ws.onopen = function() {
        console.log('WebSocket Client Connected');
    };
     
    ws.onclose = function() {
        console.log('echo-protocol Client Closed');
    };
     
    ws.onmessage = function(e) {
        if (typeof e.data === 'string') {
             setTimeout(function(){  
                showTextBubble(e.data, "right"); 
            }, 2000);
        }
    };

    recognition.onresult = function(event) {
         var text = event.results[0][0].transcript;
         showTextBubble(text, "left");
        //console.log('You said: ', event.results[0][0].transcript);
         $("#state-icon").removeClass("glyphicon-record").addClass("glyphicon-bullhorn");
         if (ws.readyState === ws.OPEN) {
                ws.send(text);
               
         }
    };

    $("#state-icon").on("click", function(){
        recognition.start();
        $(this).removeClass("glyphicon-bullhorn").addClass("glyphicon-record");
    });

}());
