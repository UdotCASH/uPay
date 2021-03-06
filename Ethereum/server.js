//
// provider = ethers.getDefaultProvider("rinkeby");
//
//
// provider.on("0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1", function(newBalance) {
//     console.log(newBalance);
// });

//generate and sweep

//liste

var ethers = require('ethers')
let utils = ethers.utils;
const csv = require('csv-parser');
const fs = require('fs');

const http = require('http')
const port = 3004
const price = ethers.utils.parseEther("0.1")
const uCADprice = ethers.utils.parseUnits("20",8)

let addresses = new Array();
let activeAddresses = new Array();

let provider

let uCADAddress = "0x0f54093364b396461aadf85c015db597aab56203"
let uCADABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "bountyHunter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bounty",
				"type": "uint256"
			}
		],
		"name": "payBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
let uCAD

let n

initialize()
async function initialize(){

  provider = ethers.getDefaultProvider("ropsten");
  uCAD = new ethers.Contract(uCADAddress,uCADABI,provider)
	n = 0

}

fs.readFile('addresses.csv', function read(err, data) {

    if (err) {
        throw err;
    }
    var rows = data.toString().split("\n");

    var cells = rows[1].split(",");

    let types = new Array()
    for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];
          types.push(cell)
        }

    for(let r=1;r<rows.length-1;r++){
      addresses.push(rows[r])
      }
      console.log(addresses)
});

var fxn = async function() {
    await listen()
}

timer = setInterval(fxn, 5000);





//
//
//
// //initialize()
// async function initialize() {
//
//  provider = ethers.getDefaultProvider('rinkeby');
//
//  contract = new ethers.Contract(contractAddress, contractABI, provider);
//
//  let lastUpdated = await contract.lastUpdated()
//  lastUpdated = lastUpdated.toNumber()
//
//  let numConverters = await contract.numConverters()
//  for (let m = 0; m<numConverters; m++){
//    let converter = await contract.converters(m)
//  }
// }
//
// async function Upload() {
//
// 	let Converters = new Array()
// 	let Hashes = new Array()
// 	positions = new Array()
//
// 			var csvUpload = document.getElementById("csvUpload");
// 			var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
//  			if (regex.test(csvUpload.value.toLowerCase())) {
//
// 				localStorage.setItem("converters","")
// 				if (typeof (FileReader) != "undefined") {
// 					var reader = new FileReader();
// 					reader.onload = function (e) {
// 					var rows = e.target.result.split("\n");
// 					tnum = rows.length
//
// 					var cells = rows[1].split(",");
//
// 					let types = new Array()
// 					for (var j = 0; j < cells.length; j++) {
// 								var cell = cells[j];
// 								types.push(cell)
// 							}
//
// 							for(let r=2;r<tnum-1;r++){
// 								var cells;
//
// 								setTimeout(function(){
//
// 									cells = rows[r].split(",");
// 									let converter = new Array()
// 											for (var j = 0; j < cells.length; j++) {
// 														var cell = cells[j];
// 														converter.push(cell)
// 											 		}
// 											let hash = utils.solidityKeccak256(types,converter)
// 											Converters.push(converter)
// 											Hashes.push(hash)
//
// 											let location = converter[12] + " "
// 											 + converter[13] + " , "
// 											 + converter[15] + " , "
// 											 + converter[16] + " , "
// 											 + converter[18]
//
// 											 geocoder.geocode( { 'address': location}, function(results, status) {
// 										 			positions[r] = results[0].geometry.location
// 													localStorage.setItem("converters",JSON.stringify(Converters))
// 													localStorage.setItem("hashes",JSON.stringify(Hashes))
// 													localStorage.setItem("positions",JSON.stringify(positions))
// 										 		})
// 								}, 1000*r);
// 						}
// 		}
//
// 		reader.readAsText(csvUpload.files[0]);
//
// 		} else {
// 			alert("This browser does not support HTML5.");
// 		}
// 		} else {
// 			alert("Please upload a valid CSV file.");
// 		}
// }
//
// //
// // upload csv
// // load converter info
// //
// // serve marker locations and converter info
//
const requestHandler = (request, response) => {
  console.log(request.url)

	const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'X-Requested-With'

  };

  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers);
    response.end();
    return;
  }

  if (['GET', 'POST'].indexOf(request.method) > -1) {
    response.writeHead(200, headers);
		let requestSplit = request.url.split("?")
    console.log(requestSplit)

		if(requestSplit[0]=="/one"){

			let responseString = new String()

			let params = requestSplit[1].split("&")
				for (let i = 0;i<params.length;i++){
					let keyValue = params[i].split("=")
					let key = keyValue[0]
					let value = keyValue[1]
					responseString += key + ": " + value + "\n"
				}
				response.end(responseString)
				return;
			} else if(requestSplit[0]=="/getPaymentAddress"){

          let paymentAddressPromise = getPaymentAddress()
          paymentAddressPromise.then(function(address){
            response.end(address)
            return
          })
			} else if(requestSplit[0]=="/coords"){
					response.end(JSON.stringify(coords))
			} else if(requestSplit[0]=="/hashes"){
					response.end(JSON.stringify(hashes))
			}else {

		response.writeHead(200, headers);
		response.end(" method is not allowed for the request.")

		return;
		}
}
}

const server = http.createServer(requestHandler)

server.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

async function getPaymentAddress() {
  let address
  let balance
  let uCADbalance


  do{
    address = addresses[n]
    balance = await provider.getBalance(address)
    uCADbalance = await uCAD.balanceOf(address)
    n++


  } while(balance.gt(0)||uCADbalance.gt(0))

  activeAddresses.push(address)
  return(address)
}

function isActiveAddress(address){

  for(m = 0; m<activeAddresses.length;m++){
    if(activeAddresses[m]==address){
      return true
    }
  }
  return false
}


async function listen(){
  console.log("Listening")

  for(y = 0; y<activeAddresses.length;y++){
    let address = activeAddresses[y]
    let balance = await provider.getBalance(address)
    let uCADbalance = await uCAD.balanceOf(address)
    if(balance.gte(price)){
      processPayment(y)
    } else if(uCADbalance.gte(uCADprice)){
      processPayment(y)
    }
  }

}

function processPayment(j){
  activeAddresses.splice(j,1)
  console.log("activeAddresses:")
  console.log(activeAddresses)
}
