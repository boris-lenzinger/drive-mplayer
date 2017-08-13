var express = require('express');
var FIFO = require('fifo-js');
var app = express();

let fifo = new FIFO('/tmp/mplayercontrol');

var generateHtml = function(message) {
	var html = `<html>
        <body>
                <a href="/forward/5">Avancer de 5 secondes</a><br/>
                <a href="/backward/5">Reculer de 5 secondes</a><br/>
                <a href="/bigforward">Avancer de 30 secondes</a><br/>
                <a href="/bigbackward">Reculer de 30 secondes</a><br/>
                <a href="/next-video">Prochaine vidéo</a><br/>
                <a href="/prev-video">vidéo Précédente</a><br/>
                <a href="/volume/increase">Plus fort</a><br/>
                <a href="/volume/decrease">Moins fort</a><br/>
                <a href="/pause">Pause/Play</a><br/>
		<br/>
		<br/>`;
	if ( message !== undefined ) {
		html += message + '<br/>';
	}
	html +=`        </body>
</html>`;

	return html;
}


var send = function(response, message) {
	response.send(generateHtml(message));
}

app.get('/', function(req, res) {
	send(res,'No action sent.');
});

app.get('/forward/:time', function(req, res) {
	fifo.write('seek ' + req.params.time +' \n');
	send(res,"Forward in Video of '"+req.params.time+"' seconds.");
});

app.get('/backward/:time', function(req, res) {
	fifo.write('seek -'+req.params.time+' \n');
	send(res,"Backward in Video of '"+req.params.time+"' seconds.");
});

app.get('/bigforward', function(req, res) {
	fifo.write('seek 30 \n');
	send(res,"Big forward in the video (30 seconds).");
});

app.get('/bigbackward', function(req, res) {
	fifo.write('seek -30 \n');
	send(res,"Big backward in the video (30 seconds).");
});

app.get('/next-video', function(req, res) {
	fifo.write('pt_step 1\n');
	send(res,"Next Video.");
});

app.get('/prev-video', function(req, res) {
	fifo.write('pt_step -1\n');
	send(res,"Previous Video.");
});

app.get('/volume/increase', function(req, res) {
	fifo.write('volume 30\n');
	send(res,"Volume increased.");
});

app.get('/volume/decrease', function(req, res) {
	fifo.write('volume -30\n');
	send(res,"Volume decreased.");
});

app.get('/pause', function(req, res) {
	fifo.write('pause\n');
	send(res,"Pause/Restart sent.");
});

app.listen(1337);
console.log("Serveur lancé sur le port 1337.");
