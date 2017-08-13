# drive-mplayer
A proof of concept in using NodeJs application to drive a mplayer instance.

This tool is done to drive an mplayer instance on my main host while i'm prototyping or programming on my laptop.
I create the fifo file and then drive the playlist with this.

```
mkfifo /tmp/mplayercontrol
mplayer -slave -input file=/tmp/mplayercontrol -playlist list.txt
```

and in another terminal :
```
node src/main.js
```
which starts a webserver on port 1337. Then open the URL http://youhost:1337/ and you get a very rough web page to
control your mplayer with basic commands.

This is really a prototype and it is very easy to code. There is no difficult thing in there. Simple a web API that
has a limited set of options and are pushed to the fifo file and let mplayer interpret them. But that is enough to me
to control my player from my couch :-)

This project has been pushed here just to keep the code in a safe place. Use official npm projects around mplayer instead of this.
