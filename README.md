# BitBurner
My BitBurner scripts.

A few things about BitBurner so you can understand what the code does.:

The point of the game is to get money from hacking servers. To do this you use ns.hack(target). Servers do have a required level for your hacking skill to be at before you can hack them though.
hacing gives you money based on a % of the money in the server, so you want to increase the money in the server by using ns.grow(target). Note: servers do have a max amount of money.
as you grow the server, security in it increases. Security slows down hack and grow as well as increases the chance for hacking to fail. to lower security: ns.weaken(target)

All scripts require RAM to run., and each server has a set amount of RAM, so once you have root access to the server, you can run scripts on it.

nuke(server) Gives root access to the target server so you can hack grow or weaken it; provided the needed # of ports are open on the target.
scan(server) gets all servers that have a direc tconnection to the target as a list.
killall(server) kills all scripts that are running on the target server.
scp(file, server) copies the file specified from the server the command is run from to the target.
tprint(string) just prints the specified text to the in-game terminal
brutessh(server), ftpcrack(server), relaysmtp(server), httpworm(server), and sqlinject(server) all open their respective port on the target server.
getServerNumPortsRequired(server) gets the needed # of open ports to nuke the target
exec(script, server, threads) runs the specified script, on the specified server (provided the file exists on it), with the specified # of threads.
run(script, threads) same as above, but can only be used for scripts on the host server.
