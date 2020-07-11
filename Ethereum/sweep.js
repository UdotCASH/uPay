const ethers = require("ethers")

const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
let provider
let wallet
let masterNode

const txFee = ethers.utils.parseEther("0.000799")



initialize()
sweep()

async function initialize(){

  provider = ethers.getDefaultProvider("ropsten");
  wallet = ethers.Wallet.fromMnemonic(mnemonic)


  masterNode = ethers.utils.HDNode.fromMnemonic(mnemonic);


  //uPay = new ethers.Contract(uPayAddress,uPayABI,provider)
}

async function sweep(){
  await initialize()
  for (i=0;i<999;i++){
    let wallet = masterNode.derivePath("m/44'/60'/0'/0/" + i);


    let walletWithProvider = new ethers.Wallet(wallet.privateKey, provider);

    let balance = await provider.getBalance(wallet.address)
    if(balance.gte(txFee)){
    var transaction = {
      gasLimit: 21000,
      gasPrice: ethers.utils.parseUnits("38",9),

      to: "0x9b6e7FCF6A51A90E28CEB5f3a3C41964E3afFb65",

      value: balance.sub(txFee),
      data: "0x"

  };

    let signedTx = await walletWithProvider.sign(transaction)

    let tx = await provider.sendTransaction(signedTx)

    console.log(tx)
}
  }
}
