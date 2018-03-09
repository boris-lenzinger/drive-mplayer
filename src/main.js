var express = require('express');
var FIFO = require('fifo-js');
var app = express();

let fifo = new FIFO('/tmp/mplayercontrol');

var generateHtml = function(message) {
	var html = `<html>
        <body>
                <a href="/backward/600">Reculer de 10 minutes</a><br/>
                <a href="/backward/300">Reculer de 5 minutes</a><br/>
                <a href="/backward/150">Reculer de 2 min 30 sec</a><br/>
                <a href="/backward/75">Reculer de 1 min 15 sec</a><br/>
                <a href="/backward/30">Reculer de 30 sec</a><br/>
                <a href="/backward/15">Reculer de 15 sec</a><br/>
                <a href="/backward/10">Reculer de 10 sec</a><br/>
                <a href="/backward/5">Reculer de 5 secondes</a><br/>
                <a href="/forward/5">Avancer de 5 secondes</a><br/>
                <a href="/forward/10">Avancer de 10 secondes</a><br/>
                <a href="/forward/15">Avancer de 15 secondes</a><br/>
                <a href="/forward/30">Avancer de 30 secondes</a><br/>
                <a href="/forward/75">Avancer de 1 min 15 sec</a><br/>
                <a href="/forward/150">Avancer de 2 min 30 sec</a><br/>
                <a href="/forward/300">Avancer de 5 min</a><br/>
                <a href="/forward/600">Avancer de 10 minutes</a><br/>
                <a href="/next-video">Prochaine vidéo</a><br/>
                <a href="/prev-video">vidéo Précédente</a><br/>
                <a href="/volume/increase">Plus fort</a><br/>
                <a href="/volume/decrease">Moins fort</a><br/>
                <a href="/pause">Pause/Play</a><br/>
                <a href="/sub_switch">Switch subtitles</a><br/>
                <a href="/audio_switch">Switch Audio</a><br/>
                <a href="/get_title">Show the file name</a><br/>
                <a href="/show_progression">Show the progression of the file</a><br/>
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

app.get('/sub_switch', function(req, res) {
	fifo.write('sub_select\n');
	send(res,"Changing of subtitle sent.");
});

app.get('/audio_switch', function(req, res) {
	fifo.write('switch_audio\n');
	send(res,"Changing of audio channel sent.");
});

app.get('/get_title', function(req, res) {
	fifo.write('get_file_name\n');
	send(res,"Show the filename.");
});

app.get('/show_progression', function(req, res) {
	fifo.write('osd_show_progression\n');
	send(res,"Show the progression of the file.");
});


app.listen(1337);
console.log("Serveur lancé sur le port 1337.");
