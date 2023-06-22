/** @param {NS} ns */

//I have no idea whatmost of this is, its just what I run every time I rebirth. 
//I probably programed it at like 5am and it looks super bad. Don't judge me on this one... please
export async function main(ns) {
var servers = ["home"]
var i = 0
while (i < servers.length) {
    
    var server = servers[i]
    var newServers = ns.scan(server)
    i += 1
    
    for (var j = 0; j < newServers.length; j++) {
      if (!servers.includes(newServers[j])) {
        servers.push(newServers[j])    
      }
    }
  }
debugger
//this distributes the basic hack grow and weaken scripts over all available servers
for (var i = 0; i < servers.length; i++) {
  ns.scp(ns.ls("home", "startDist/"), servers[i], "home")
}
i = 0
while(true){
  if(i == 6) {
    var i = 0
  }

  var tgt = servers[i]

  if (ns.hasRootAccess(tgt) == true) {
    ns.nuke(tgt) //Nuke gives root access to the target server, as long as the required # of ports are open
  }
  else {
    i += 1
  }
  while (ns.getServerMoneyAvailable(tgt) / 0) {
    if(ns.hasRootAccess(tgt)){
      await ns.hack(tgt)
    }
    i += 1
    }
  } 
}