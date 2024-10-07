/** @param {NS} ns */
export async function main(ns) {

    var args = arguments
    var noRam = ""
    var previouslyExistant = ""
    var numPreviouslyExistant = 0
    var file = null
    var numFailed = 0
    var numSucceeded = 0
  
    /**
     * Checks if there is a file specified for distribution.
     * @returns {list} Returns a list in which [0] is the boolean value of whether or not a filename was specified, and [1] is the filename if it was.
     */
    function checkForFilename() {
      const filenameRegex = /\.[a-zA-Z0-9]+$/ //matches a dot (\.) followed by one or more alphanumeric characters ([a-zA-Z0-9]+) at the end of the string ($)
      for (let arg of ns.args) {
        if (filenameRegex.test(arg)) {
          return [true, arg]
        }
      }
      return [false, null]
    }
  
    /**
     * Returns '2' if the server has enough ram to run the standard barrage, 1 if it can only run the weak version, and 0 if it can't run anything.
     * @param {string} server 
     * @returns {int}
     */
    function serverAvailabilityQuery(server) {
      var basicRamRequired = [ns.getScriptRam('basics/hack.js'), ns.getScriptRam('basics/weaken.js'), ns.getScriptRam('basics/grow.js')]
      if (Math.max(...basicRamRequired) + ns.getScriptRam("barrage.js") <= ns.getServerMaxRam(server)) {
        return 2
      }
      else if (ns.getScriptRam("weakBarrage.js") <= ns.getServerMaxRam(server)) {
        return 1
      }
      else {
        return 0
      }
    }
  
    /**
     * Sets the default distribution file.
     * @returns {string} the name of the distribution file
     * @param {string} server
     */
    function decideDistribution(server) {
      if (checkForFilename()[0]) {
        file = checkForFilename()[1]
      }
      else {
        if (serverAvailabilityQuery(server) == 2) {
          file = "barrage.js"
        }
        else if (serverAvailabilityQuery(server) == 1) {
          file = "weakBarrage.js"
        }
      }
    }
    /**
     * Locates all available servers.
     * @returns {list}
     */
    function scanServers() {
      var servers = ["home"]
      for (var i = 0; i < servers.length; i++) {
        var server = servers[i];
        var newServers = ns.scan(server);
  
        for (var j = 0; j < newServers.length; j++) {
          if (!servers.includes(newServers[j])) {
            servers.push(newServers[j])
          }
        }
      }
      return servers
    }
  
    /**
     * Simplifies the print function, and disables printing if script is ran with "-s" as an argument
     * @param {*} input 
     */
    function print(input) {
      if (ns.args.includes("-s") == false) {
        ns.tprint(input)
      }
    }
  
    /**
     * Checks to make sure the distribution file does not already exist on the server
     * @param {string} server 
     * @returns {boolean} Returns False if the file does not exist, and True if it does.
     */
    function checkForExistingDistributionFile(server) {
      if (ns.fileExists(file, server)) {
        return true
      }
      else {
        return false
      }
    }
  
    /**
     * Returns the file type
     * @param {string} input 
     * @returns {string}
     */
    function readFileType(fileName) {
      var type = fileName.split(".")[1]
      return type
    }
  
    /**
     * Opens as many ports as possible, and returns how many are then open.
     * @returns {int}
     * @param {string} Server
     */
    function getAvailablePorts(server) {
      var openPorts = 0
  
      if (ns.fileExists('BruteSSH.exe')) {
        ns.brutessh(server)
        openPorts += 1
      }
      if (ns.fileExists('FTPCrack.exe')) {
        ns.ftpcrack(server)
        openPorts += 1
      }
      if (ns.fileExists('relaySMTP.exe')) {
        ns.relaysmtp(server)
        openPorts += 1
      }
      if (ns.fileExists('HTTPWorm.exe')) {
        ns.httpworm(server)
        openPorts += 1
      }
      if (ns.fileExists('SQLInject.exe')) {
        ns.sqlinject(server)
        openPorts += 1
      }
      return openPorts
    }
  
    /**
     * Distributes a script to a given server, and runs it if it is a js file.
     * @param {string} server The server to distribute to.
     * @returns {void}
     */
    function distribute(server) {
        debugger
      if (ns.args.includes("-f") && readFileType(file) == "js") {
        ns.kill(file, server)
      }
      ns.scp(file, server)
      ns.scp("Target.txt", server)
      if (readFileType(file) == "js") {
        ns.nuke(server)
        ns.exec(file, server)
      }
    }
  
    /**
     * Checks if the server has enough ram to run the distributed script, and if the file already exists on the server.
     * @param {string} server The server to check
     * @returns {boolean} Returns True if the server has enough ram and the file does not exist, or if the -f argument is passed. Otherwise, returns False.
     */
    function ramAndExistanceCheck(server) {
      var passthrough = 0
      if (server == "home") {
        return true
      }
      if (!ns.args.includes("-f")) {
        if (checkForExistingDistributionFile(server)) {
          previouslyExistant += "\n " + server
          numPreviouslyExistant += 1
        }
        else {
          passthrough += 1
        }
      }
      else {
        passthrough += 1
      }
  
      if (serverAvailabilityQuery(server) != 0) {
        passthrough += 1
      }
      else {
        noRam += "\n " + server
      }
  
      if (passthrough == 2) {
        return true
      }
      else {
        return false
      }
    }
  

    // Main loop
    var serversList = scanServers()
    for (var i = 0; i < serversList.length; i++) {
      var server = serversList[i]
      decideDistribution(server)
      if (ramAndExistanceCheck(server)) {
        print("Deploying to " + server + "...")
        if (ns.getServerNumPortsRequired(server) > getAvailablePorts(server) && server != "home") {
          print("Failed to deploy. Hackable ports: " + getAvailablePorts(server) + " / " + ns.getServerNumPortsRequired(server))
          numFailed += 1
        }
        else {
          distribute(server)
          print("Deployed.")
          numSucceeded += 1
        }
        await ns.sleep(50)
      }
    }
    if (previouslyExistant.length > 0) {
      print("\n\n" + "~~~~~ The following servers already have the script. use -f to overwrite: ~~~~~~" + "\n" + previouslyExistant + "\n\n")
    }
  
    if (noRam.length > 0) {
      print("\n\n" + "~~~~~ The following servers have no ram: ~~~~~~" + "\n" + noRam)
    }
    print(
      "\n\n" +
      "\nDistributed: " + numSucceeded.toString() +
      "\nFailed: " + numFailed.toString() +
      "\nAlready Existed: " + numPreviouslyExistant.toString()
    )
  }