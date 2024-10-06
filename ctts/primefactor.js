/** @param {NS} ns */
export async function main(ns) {
//36639359
const max = 36639359
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var i = 2

while(true) {
  var dividedWhole = false
  var num = max/i
  ns.tprint("Testing " + i + ": " + num)
  var prime = true

  debugger

  if (max % i === 0 ) {//If max / i is a whole number
    dividedWhole = true
    
    for (var j = 2; j <= digits.length; j++) {
      ns.tprint("Dividing: " + j)
      
      if (num % j !== 0) {
        ns.tprint("Result: Float")
        }
        
      else {
        prime = false
        ns.tprint("Result: Integer")
        }
      }
    }
  else {
    if (dividedWhole == false) {
      prime = false
      ns.tprint("Failed, result of divide is float.")
    }
  }
  
  if (prime == true) {
    ns.tprint ("Maximum Prime Factor found. Result: " + num)
    break
   }
  i += 1
  await ns.sleep(0.01)
  }
}