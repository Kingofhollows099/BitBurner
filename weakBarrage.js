/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog('getServerSecurityLevel')
  ns.disableLog('getServerMinSecurityLevel')
  ns.disableLog('getServerMaxMoney')
  ns.disableLog('getServerMoneyAvailable')

  //Change the string in  the below line to whatever you want to target
  while (true) {
    var host = ns.read('Target.txt')

    var Slevel = ns.getServerSecurityLevel(host)
    var SMin = ns.getServerMinSecurityLevel(host)
    var MMoney = ns.getServerMaxMoney(host)
    var Money = ns.getServerMoneyAvailable(host)

    if (Money <= MMoney * 0.8) {
      await ns.grow(host)
    }
    else if (Slevel >= SMin + 5) {
      await ns.weaken(host)
    }
    else {
      await ns.hack(host)
    }
  }
}