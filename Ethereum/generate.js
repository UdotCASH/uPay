const ethers = require("ethers")

const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
let provider
let wallet
let walletWithProvider
let masterNode


const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'addresses.csv',
  header: [
    {id: 'address', title: 'Addresses'}
  ]
});

initialize()
generate()

async function initialize(){

  provider = ethers.getDefaultProvider("ropsten");

  wallet = ethers.Wallet.fromMnemonic(mnemonic)

  walletWithProvider = new ethers.Wallet(wallet.privateKey, provider);

  masterNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

  //uPay = new ethers.Contract(uPayAddress,uPayABI,provider)
}

async function generatePayment(){
let activeBalance
do{
  activePaymentNode = masterNode.derivePath("m/44'/60'/0'/0/" + n++);
  activeAddress = activePaymentNode.address
  activeBalance = await provider.getBalance(activeAddress)
} while(activeBalance.gt(0))

  document.getElementById("paymentQR").src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + activeAddress
  document.getElementById("addressLabel").innerHTML ="Address: " + activeAddress
  document.getElementById("instructions").innerHTML = "Send 0.1 Eth to the above address"

  // provider.on("0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1", function(newBalance) {
  //     alert("Payment Received")
  // });
  count = 0;
  totalTime = timeOut
  clearInterval(timer)
  timer = setInterval(fxn, 1000);

}



var fxn = async function() {
  var timeLeft = totalTime - count;
  count++;
  var mins = parseInt(timeLeft/60)
  var seconds = timeLeft - (mins*60)
  if(seconds<10){
    seconds = "0" + seconds
  }

  let balance = await provider.getBalance(activeAddress)
  if(balance.gte(price)){
    await completePayment()
    clearInterval(timer)
    alert("Payment of 0.1 ETH detected. Purchase successful")
  }

  if(timeLeft>=0){
    timeLeftText = mins + ":" + seconds;
  } else {
    timeLeftText = "Time's up"
  }

  document.getElementById('time').innerHTML = timeLeftText

}




   function generate(){
     let data = new Array()

     for (i=0;i<999;i++){
       let address = masterNode.derivePath("m/44'/60'/0'/0/" + i);
       let datapoint = new Object()
       datapoint.address = address.address
       data.push(datapoint)
     }

     csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));
   }
