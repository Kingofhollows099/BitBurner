/** @param {NS} ns */
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
servers.shift()
debugger
await ns.sleep(1000)

ns.tprint("Distributing Basics.")
for (var i = 0; i < servers.length; i++) {
  ns.scp(ns.ls("home", "basics/"), servers[i], "home")
}
await ns.sleep(1000)
ns.tprint('Done distributing.')

await ns.sleep(1000)

ns.tprint("AutoTargeting.js initiating.")
await ns.sleep(1000)
ns.run("AutoTargeting.js", 1, "start")

await ns.sleep(2000)

ns.tprint("Distributing Barrage.js in")
await ns.sleep(1000)
ns.tprint("3...")
await ns.sleep(1000)
ns.tprint("2...")
await ns.sleep(1000)
ns.tprint("1...")
await ns.sleep(1000)
ns.tprint("Distributing.")
ns.run("distribute.js")
/**
i = 0
while(true){
  if(i >= 6) {
    var i = 0
  }

  var tgt = servers[i]

  if (ns.hasRootAccess(tgt) == true) {
    ns.nuke(tgt)
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
*/
}