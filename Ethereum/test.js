const http = require('http')
const port = 3004

var fxn = async function() {
    console.log("heyhey")
}

timer = setInterval(fxn, 1600);

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
					let paymentAddress = getPaymentAddress()
          console.log(paymentAddress)
          response.end(paymentAddress)
          return;
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

function getPaymentAddress() {
  return("shoobeloobedoo")
}
