/** @param {NS} ns */
export async function main(ns) {

//This script is the main one that will be managing hacking, weakening and growing servers.

  ns.disableLog('getServerSecurityLevel')
  ns.disableLog('getServerMinSecurityLevel')
  ns.disableLog('getServerMaxMoney')
  ns.disableLog('getServerMoneyAvailable')
  
  while(true) {
    var target = ns.read('Target.txt')
    var host = ns.getHostname()
    var Slevel = ns.getServerSecurityLevel(target)
    var SMin = ns.getServerMinSecurityLevel(target)
    var MMoney = ns.getServerMaxMoney(target)
    var Money = ns.getServerMoneyAvailable(target)
  //If Security is below half, grow. else weaken
  //If grow is maxed weaken until security is at its minimum
  // else hack
  

  //There is a persitant bug in this portion causing the threads to result in 0 and the program to crash. I can't figure out why though `\(~_~)/`
  var available = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)
  var executed = null
    if (Slevel >= SMin * 1.5) {
      ns.exec("startDist/weaken.js", host, 
        Math.floor(available / ns.getScriptRam("startDist/weaken.js")), target)
      await ns.sleep (ns.getWeakenTime(target) + 200)
    }

    else if (Money < MMoney) {
      ns.exec("startDist/grow.js", host,
        Math.floor(available / ns.getScriptRam("startDist/grow.js")), target)
      await ns.sleep (ns.getGrowTime(target) + 200)
      } 

      else if (Slevel > SMin) {
        ns.exec("startDist/weaken.js", host, 
          Math.floor(available / ns.getScriptRam("startDist/weaken.js")), target)
        await ns.sleep (ns.getWeakenTime(target) + 200)
        }

        else {
          ns.exec("startDist/hack.js", host, 
            Math.floor(available / ns.getScriptRam("startDist/hack.js")), target)
          await ns.sleep (ns.getHackTime(target) + 200)
          }  
  }
}