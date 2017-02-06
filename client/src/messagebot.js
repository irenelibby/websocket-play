(function () {
    var W3CWebSocket = require('websocket').w3cwebsocket;
    var ws = new W3CWebSocket('ws://localhost:8181/', 'echo-protocol');
    
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

    $("#btn-enter").on("click", function() {
        var text = $("#txt-message").val();
         showTextBubble(text, "left");
        if (ws.readyState === ws.OPEN) {
                ws.send(text);
               
        }
    });

}());
