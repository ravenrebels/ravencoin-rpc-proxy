# ravencoin-rpc-proxy

## A open web API for Ravencoin

**Purpose**: make Ravencoin blockchain available via HTTP/WEB by exposing the RPC-API via a Proxy that only allows safe procedures.

## How to install
```
git clone https://github.com/ravenrebels/ravencoin-rpc-proxy.git
cd ravencoin-rpc-proxy
npm install 
```

## Sir, how do I configure this software?

Create a config.json file with configuration about your environment
```
{
    "endpoint": "https://rpc.ting.finance/rpc",
    "environment": "Ravencoin Testnet",
    "local_port": 9999,
    "username": "THE USERNAME FOR MY LOCAL RAVEN CORE NODE",
    "password": "THE PASSWORD FOR MY LOCAL RAVEN CORE NODE",
    "raven_url": "http://localhost:8888"
}
  ```

## Sir, how should my Raven core node be configured?
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