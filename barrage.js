/** @param {NS} ns */
export async function main(ns) {
  //ns.disableLog('getServerSecurityLevel')
  ns.disableLog('getServerMinSecurityLevel')
  ns.disableLog('getServerMaxMoney')
  //ns.disableLog('getServerMoneyAvailable')

  //Change the string in  the below line to whatever you want to target
  while (true) {
    var target = ns.read('Target.txt')
    var host = ns.getHostname()
    var Slevel = ns.getServerSecurityLevel(target)
    var SMin = ns.getServerMinSecurityLevel(target)
    var MMoney = ns.getServerMaxMoney(target)
    var Money = ns.getServerMoneyAvailable(target)
    //If Security is below half, grow. else weaken
    //If grow is maxed weaken until security is at its minimum
    // else hack
    debugger
    var available = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)

    if (host == "home") {
      available -= 10
    }
    
    function decideThreads(input) {
      var step1 = available / ns.getScriptRam(`basics/${input}.js`)
      var step2 = Math.floor(step1)
      var step3 = Math.max(step2, 1)
      var step4 = Math.min(step3, Infinity)
      return step4
    }

  //failsafe loop
  while (true) {
    if (ns.hasRootAccess(target) == true) {
      break
    }
    await ns.sleep(10)
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