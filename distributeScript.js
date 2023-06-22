/** @param {NS} ns */
export async function main(ns) {

//This script will distribute a specific script over all available servers. 
//By default the script is barrage.js, but you can specify it as an argument.


  //Gets all available servers 
  var args = arguments
  var servers = ["home"]
  var i = 0
  var noRam = ""
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

  var script = null
  //Default deploy
  if (!ns.args[0]) {
    script = "barrage.js"
  }
  else {
    script = ns.args[0]
  }  

  
  for (var i = 0; i < servers.length; i++) {
    var type = script.split(".")[1]
    if(type == "js") {
      ns.killall(servers[i])
    }
    ns.tprint('Deploying to ' + servers[i])
    ns.scp(script, servers[i])
    ns.scp("Target.txt", servers[i])
    
    var openPorts = 0

    if (ns.fileExists('BruteSSH.exe')) {
       ns.brutessh(servers[i])
       openPorts += 1
    }
    if (ns.fileExists('FTPCrack.exe')) {
       ns.ftpcrack(servers[i])
       openPorts += 1
    }
    if (ns.fileExists('relaySMTP.exe')) {
       ns.relaysmtp(servers[i])
       openPorts += 1
    }
    if (ns.fileExists('HTTPWorm.exe')) {
       ns.httpworm(servers[i])
       openPorts += 1
    }
    if (ns.fileExists('SQLInject.exe')) {
       ns.sqlinject(servers[i])
       openPorts += 1
    }
    if (type == "js") {

      if (ns.getServerNumPortsRequired(servers[i]) <= openPorts) {
        ns.nuke(servers[i])
      }
      var maxThreads = Math.floor(ns.getServerMaxRam(servers[i]) / ns.getScriptRam(script))
      if (!maxThreads == 0) {
        if (ns.hasRootAccess(servers[i])){
        ns.exec(script, servers[i], maxThreads)
        ns.tprint('Deployed')
        }
        else {
          ns.tprint("Failed to deploy. Hackable ports: " + openPorts + " / " +
          ns.getServerNumPortsRequired(servers[i]))
          }
        }
      else {
        noRam += "\n " + servers[i]
      }
    }
  await ns.sleep(50)
  }

if (noRam.length > 0){
  ns.tprint("\n\n" + "~~~~~The following servers have no ram: ~~~~~~" + "\n" + String(noRam))
  }
}