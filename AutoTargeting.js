/** @param {NS} ns */
export async function main(ns) {
  if (ns.args[0] == "start") {
    ns.tprint("AutoTargeting Initiated.")
    await ns.sleep(1000)
  }
                                               //<------ New Version
//ns.disableLog("ALL")
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
/*
  function sweep() {
    for (var i = 0; i < servers.length(); i++) {
    
    }
  }
*/
var dict = {
  0: "n00dles",
  1: "joesguns",
  2: "phantasy",
  3: "rho-construction"
}
  function hackable(server) {
    var openPorts = 0
    if (ns.fileExists('BruteSSH.exe')) {
      openPorts += 1
    }
    if (ns.fileExists('FTPCrack.exe')) {
      openPorts += 1
    }
    if (ns.fileExists('relaySMTP.exe')) {
      openPorts += 1
    }
    if (ns.fileExists('HTTPWorm.exe')) {
      openPorts += 1
    }
    if (ns.fileExists('SQLInject.exe')) {
      openPorts += 1
    }
    if (openPorts >= ns.getServerNumPortsRequired(server)) {
      return true
    }
    else {
      return false
    }
  }
  while (true) {
    var oldLevel = ns.read("Target.txt")
    var hackingLevel = ns.getHackingLevel()
    if (hackingLevel >= ns.getServerRequiredHackingLevel("rho-construction") * 2 && hackable("rho-construction")) {
      ns.write("Target.txt", dict[3], "w")
      
    }
    else if (hackingLevel >= ns.getServerRequiredHackingLevel("phantasy") * 2 && hackable("phantasy")) {
      ns.write("Target.txt", dict[2], "w")
      
    }
    else if (hackingLevel >= ns.getServerRequiredHackingLevel("joesguns") * 2 && hackable("joesguns")) {
      ns.write("Target.txt", dict[1], "w")
      
    }
    else {
      ns.write("Target.txt", dict[0], "w")
    }
    if (ns.read("Target.txt") != oldLevel) {
      ns.run("distribute.js", 1, "Target.txt", "-f", "-s")
      ns.tprint("NOTICE: AutoTargeting updated hack target to " + ns.read("Target.txt") + ".")
    }
    await ns.sleep(10000)
  }
}
/*                                            //<----- Old Version
  var serverDict = {}
  
  var oldTarget = "Walgreens"

  while (true) {
    //Server Scan
    var servers = ["home"]
    var i = 0

    while (i < servers.length) {
      //ns.tprint("Iteration " + i) //Debugging
      var server = servers[i]
      var newServers = ns.scan(server)
      i += 1
      //ns.tprint(newServers) //Debugging
      for (var j = 0; j < newServers.length; j++) {
        if (!servers.includes(newServers[j])) {
          servers.push(newServers[j])
        }
      }
    }
    var openPorts = 0
    if (ns.fileExists('SQLInject.exe')) {
      openPorts += 1
    }
    if (ns.fileExists('HTTPWorm.exe')) {
      openPorts += 1
    }
    if (ns.fileExists('relaySMTP.exe')) {
      openPorts += 1
    }
    if (ns.fileExists('FTPCrack.exe')) {
      openPorts += 1
    }
   if (ns.fileExists('BruteSSH.exe')) {
      openPorts += 1
    }
    

    for (var i = 0; i < servers.length; i++) {
      var sv = servers[i]

      //Security
      var security = ns.getServerMinSecurityhackingLevel(sv)

      //Money
      var money = ns.getServerMaxMoney(sv)

      //Formula
      var score = (money / 100 + 20) / (50 / security)

      if (ns.getServerRequiredHackingLevel(sv) <= ns.getHackingLevel() / 2) {
        serverDict[sv] = score
      }
    }
    var items = Object.keys(serverDict).map(key => [key, serverDict[key]])

    items.sort((a, b) => b[1] - a[1])

    var sortedDict = Object.fromEntries(items)

    var target = items[0][0]
    
    if (oldTarget != target) {
      ns.write("Target.txt", target, "w")
      ns.run("distribute.js", 1, "Target.txt")
    }

    oldTarget = target
    await ns.sleep(10000)
    */
