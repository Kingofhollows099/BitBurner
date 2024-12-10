# BitBurner
My BitBurner scripts.

Whenever a bitnode is started, or augmentations are installed, running start.js will start Autotargeting.js and copy all the simple files from /basics to every available server (no matter how many ports are open.), then finally runs distribute.js (no ars).

Distribute.js: Distributes a file across all available servers. If the server does not have enough RAM to support at least one of the basics (/basics), it will skip that server (unless -f arg is specified.) If there is a filename arg is specified, that file will be the one distributed; otherwise, it will distribute barrage.js. If it's distributing an executable file, it will then run it on each server. While distributing, it will print the result of each copy/run attempt. Once finished, print a summary of how many servers already had the file, how many succeeded, and how many failed (excluding servers skipped due to lack of RAM).If the server does not have enough RAM to run both barrage.js and any of the basics, it will instead distribute oldBarrage.js, which is a weaker version of barrage.js that uses slightly less RAM. The -s argument makes it run silently

Barrage.js: Will calculate which of the basics would be best to run, then runs that with as many threads as possible (on home, it leaves some reserves RAM for other scripts). It will than sleep for however long the basic function runs dor.

Autotargeting.js: will calculate which server is the most optimal to target for hacking, then changes Target.txt to the name of the server. It will then run distribute .js silently (arg -s), transferring Target.txt to every available server.
