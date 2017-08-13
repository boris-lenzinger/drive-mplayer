# drive-mplayer
A proof of concept in using NodeJs application to drive a mplayer instance.

This tool is done to drive an mplayer instance on my main host while i'm prototyping or programming on my laptop.
I create the fifo file and then drive the playlist with this.

This is really a prototype and it is very easy to code. There is no difficult thing in there. Simple a web API that
has a limited set of options and are pushed to the fifo file and let mplayer interpret them. But that is enough to me
to control my player from my couch :-)

This project has been pushed here just to keep the code in a safe place. Use official npm projects around mplayer instead this.
