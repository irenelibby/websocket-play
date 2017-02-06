(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
   
    var recognition = new (webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();

    var showTextBubble = function(text, position) {
        $(".bubble-screen").append('<div class="speech-bubble speech-'+position+'">'+text+'</div>');
    };

    var delayBixbyResponse = function(text) {
        setTimeout(function(){
            showTextBubble("Bixby says '" + text + "' too", "right"); 
        }, 2000); 
    };

    recognition.onresult = function(event) {
        var text = event.results[0][0].transcript;
        showTextBubble(text, "left");
        delayBixbyResponse(text);
    };

    recognition.onaudiostart = function(event) {
        console.log("onaudiostart");
    };

    recognition.onaudioend = function(event) {
        console.log("onaudioend");
    };

    recognition.onspeechstart = function(event) {
        console.log("onspeechstart");
    };

    recognition.onspeechend = function(event) {
        console.log("onspeechend");
    };

    recognition.onnomatch = function(event) {
      showTextBubble("Sorry I do not undertand what you just said", "left");
    };

    $("#btn-enter").on("click", function() {
        var text = $("#txt-message").val();
        showTextBubble(text, "left");
        delayBixbyResponse(text);
        $("#txt-message").val("");
    });

    $("#txt-message").on("keyup", function(event){
         if(event.which == 13) {
            var text = $(this).val();
            showTextBubble(text, "left");
            delayBixbyResponse(text);
            $(this).val("");
        }
    });
}());

},{}]},{},[1]);
