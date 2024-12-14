/** @param {NS} ns */
export async function main(ns) {
  //ns.disableLog('getServerSecurityLevel')
  ns.disableLog('getServerMinSecurityLevel')
  ns.disableLog('getServerMaxMoney')
  //ns.disableLog('getServerMoneyAvailable')

    /**
     * Locates all available servers.
     * @returns {list}
     */
    function scanServers() {
      let servers = ["home"]
      for (let i = 0; i < servers.length; i++) {
        let server = servers[i];
        let newServers = ns.scan(server);
  
        for (let j = 0; j < newServers.length; j++) {
          if (!servers.includes(newServers[j])) {
            servers.push(newServers[j])
          }
        }
      }
      return servers
    }

  //Change the string in  the below line to whatever you want to target
  while (true) {
    let target = ns.read('Target.txt')
    let Slevel = ns.getServerSecurityLevel(target)
    let SMin = ns.getServerMinSecurityLevel(target)
    let MMoney = ns.getServerMaxMoney(target)
    let Money = ns.getServerMoneyAvailable(target)
    //If Security is below half, grow. else weaken
    //If grow is maxed weaken until security is at its minimum
    // else hack
    debugger
    

  //failsafe loop
    while (true) {
      if (ns.hasRootAccess(target) == true) {
        break
      }
      await ns.sleep(10)
      }

    let serverList = scanServers()

    for (let i = 0; i < serverList.length; i++) {
      let host = serverList[i]
      let availableRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - (host === "home" ? 10 : 0)
        
      function decideThreads(input) {
        let step1 = availableRam / ns.getScriptRam(`basics/${input}.js`)
        let step2 = Math.floor(step1)
        let step3 = Math.max(step2, 1)
        let step4 = Math.min(step3, Infinity)
        return step4
      }

      if (Slevel >= SMin * 1.5) {
        ns.exec("basics/weaken.js", host, decideThreads("weaken"), target)
        await ns.sleep(ns.getWeakenTime(target) + 500)
      }

      else if (Money < MMoney) {
        ns.exec("basics/grow.js", host, decideThreads('grow'), target)
        await ns.sleep(ns.getGrowTime(target) + 500)
      }

      else if (Slevel > SMin) {
        ns.exec("basics/weaken.js", host, decideThreads('weaken'), target)
        await ns.sleep(ns.getWeakenTime(target) + 500)
      }

      else {
        ns.exec("basics/hack.js", host, decideThreads('hack'), target)
        await ns.sleep(ns.getHackTime(target) + 500)
      }
    }
  }
}