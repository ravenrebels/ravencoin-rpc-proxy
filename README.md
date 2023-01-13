# ravencoin-rpc-proxy

## A Web API for Ravencoin

**Purpose**: make Ravencoin blockchain available via HTTP/WEB by exposing the RPC-API via a Proxy that only allows safe procedures.

Check out this software live at https://rpc.ting.finance/

## How do I use this software?

When your local proxy is up and running you send requests using HTTP post.
The body of the request should contain string **method** and array **params** 

### Example using Fetch API
Example for web browser and Node.js 18+
```
rpc("getblockcount", []).then(console.log);

async function rpc(method, params) {
    const data = { method, params };
    const URL = 'https://rvn-rpc-mainnet.ting.finance/rpc'; //replace with your endpoint
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const obj = await response.json(); // parses JSON response into native JavaScript objects 
    return obj.result;
} 
``` 
## Features and limitations

This software lives up to parts of the JSON-RPC 2.0 Specification
https://www.jsonrpc.org/specification

According to JSON-RPC 2.0 a request object could contain four attributes, jsonrpc, method, params and id.
- This software only supports **method** and **params**.
- This software does NOT support **id**
- This software hardcodes **jsonrpc** to "2.0"
- This sofware does NOT support batch calls.

## How to install
```
git clone https://github.com/ravenrebels/ravencoin-rpc-proxy.git
cd ravencoin-rpc-proxy
npm install 
```

### Sir, how do I configure this software?
Configure your setup in ./config.json
```
{
    "endpoint": "https://myhost/rpc",
    "environment": "Ravencoin Testnet",
    "local_port": 9999,
    "username": "THE USERNAME FOR MY LOCAL RAVEN CORE NODE",
    "password": "THE PASSWORD FOR MY LOCAL RAVEN CORE NODE",
    "raven_url": "http://localhost:8888"
}
  ```

### Sir, how should my Raven core node be configured?
Here is a recommendation
```
server=1 
listen=1

#Maintains the full transaction index on your node. Needed if you call getrawtransaction. Default is 0.
txindex=1

#Maintains the full Address index on your node. Needed if you call getaddress* calls. Default is 0.
addressindex=1

#Maintains the full Asset index on your node. Needed if you call getassetdata. Default is 0.
assetindex=1

#Maintains the full Timestamp index on your node. Default is 0.
timestampindex=1

#Maintains the full Spent index on your node. Default is 0.
spentindex=1

#Username and password - set secure username/password
rpcuser=secret
rpcpassword=secret

#What IP address is allowed to make calls to the RPC server.
rpcallowip=127.0.0.1

dbcache=4096
```

## Sir, how do I start this application?

```
npm start
```