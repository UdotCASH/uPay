let ethers = require("ethers")

provider = ethers.getDefaultProvider("rinkeby");


provider.on("0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1", function(newBalance) {
    console.log(newBalance);
});
