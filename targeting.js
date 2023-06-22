/** @param {NS} ns */
export async function main(ns) {

  var serverDict = {}
  
  var oldTarget = "Walgreens"

  while (true) {

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
      var security = ns.getServerMinSecurityLevel(sv)

      //Money
      var money = ns.getServerMaxMoney(sv)

      //Formula
      var score = (money / 100 + 20) / (50 / security)

      if (ns.getServerRequiredHackingLevel(sv) <= ns.getHackingLevel() / 2) {
        serverDict[sv] = score
      }
    }
    //This sorting method doesnt work, figure out some other way
    
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
  }
}