let provider
let wallet
let walletWithProvider
let masterNode
let activePaymentAddress
const price = ethers.utils.parseEther("0.1")


// let uPayAddress = "0x064B88b8924aB09e68b61679Bd200dbE7295d80E"
// let uPayABI
// let uPay

let n = 11

let count
let totalTime
let timer

const timeOut = 900

const txFee = ethers.utils.parseEther("0.000799")

async function initialize(){

  provider = ethers.getDefaultProvider("ropsten");

}

async function generatePayment(){
activePaymentAddress = await getPaymentAddress()

  document.getElementById("paymentQR").src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + activePaymentAddress
  document.getElementById("addressLabel").innerHTML ="Address: " + activePaymentAddress
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

  let balance = await provider.getBalance(activePaymentAddress)

  if(timeLeft>=0){
    timeLeftText = mins + ":" + seconds;
  } else {
    timeLeftText = "Time's up"
  }

  if(balance.gte(price)){
    clearInterval(timer)
    alert("Payment of 0.1 ETH detected. Purchase successful")
    timeLeftText = "Payment complete!"

  }



  document.getElementById('time').innerHTML = timeLeftText

}
