const whitelist = [
  //== Addressindex ==
  "getaddressbalance",
  "getaddressdeltas",
  "getaddressmempool",
  "getaddresstxids",
  "getaddressutxos",

  //== Assets ==
  "getassetdata",
  // "getcacheinfo",
  //"getsnapshot",
  //"issue",
  //"issueunique",
  "listaddressesbyasset",
  "listassetbalancesbyaddress",
  "listassets",
  //"listmyassets",
  //"purgesnapshot",
  //"reissue",
  //"transfer",
  //"transferfromaddress",
  //"transferfromaddresses",

  //== Blockchain ==
  //"clearmempool",
  "decodeblock",
  "getbestblockhash",
  "getblock",
  "getblockchaininfo",
  "getblockcount",
  "getblockhash",
  // "getblockhashes", //This can kill the service if you ask for all block hashes years back
  "getblockheader",
  "getchaintips",
  "getchaintxstats",
  "getdifficulty",
  "getmempoolancestors",
  "getmempooldescendants",
  "getmempoolentry",
  "getmempoolinfo",
  "getrawmempool",
  "getspentinfo",
  "gettxout",
  "gettxoutproof",
  // "gettxoutsetinfo", this method is not "dangerous" but it takes TOO long time
  //"preciousblock",
  //"pruneblockchain",
  //"savemempool",
  //"verifychain",
  //"verifytxoutproof",

  //== Control ==
  //"getinfo",
  //"getmemoryinfo",
  //"getrpcinfo",
  "help",
  //"stop",
  //"uptime",

  //== Generating ==
  //"generate",
  //"generatetoaddress",
  //"getgenerate",
  //"setgenerate",

  //== Messages ==
  //"clearmessages",
  //"sendmessage",
  //"subscribetochannel",
  //"unsubscribefromchannel",
  //"viewallmessagechannels",
  //"viewallmessages",

  //== Mining ==
  // "getblocktemplate",
  //"getkawpowhash",
  //"getmininginfo",
  "getnetworkhashps",
  //"pprpcsb",
  //"prioritisetransaction",
  //"submitblock",

  //== Network ==
  //"addnode",
  //"clearbanned",
  //"disconnectnode",
  //"getaddednodeinfo",
  //"getconnectioncount",
  //"getnettotals",
  //"getnetworkinfo",
  //"getpeerinfo",
  //"listbanned",
  //"ping",
  //"setban",
  //"setnetworkactive",

  //== Rawtransactions ==
  "combinerawtransaction",
  "createrawtransaction",
  "decoderawtransaction",
  "decodescript",
  //"fundrawtransaction",
  "getrawtransaction",
  "sendrawtransaction",
  "signrawtransaction",
  "testmempoolaccept",

  //== Restricted assets ==
  // "addtagtoaddress",
  "checkaddressrestriction",
  "checkaddresstag",
  "checkglobalrestriction",
  //"freezeaddress",
  //"freezerestrictedasset",
  "getverifierstring",
  //"issuequalifierasset",
  //"issuerestrictedasset",
  "isvalidverifierstring",
  "listaddressesfortag",
  "listaddressrestrictions",
  "listglobalrestrictions",
  "listtagsforaddress",
  //"reissuerestrictedasset",
  //"removetagfromaddress",
  //"transferqualifier",
  //"unfreezeaddress",
  //"unfreezerestrictedasset",

  //== Restricted ==
  /*
    "viewmyrestrictedaddresses",
    "viewmytaggedaddresses",
    */

  //== Rewards ==
  /*
    "cancelsnapshotrequest",
    "distributereward",
    "getdistributestatus",
    "getsnapshotrequest",
    "listsnapshotrequests",
    "requestsnapshot",

    */

  //== Util ==
  //"createmultisig",
  "estimatefee",
  "estimatesmartfee",
  "signmessagewithprivkey",
  "validateaddress",
  "verifymessage",

  //== Wallet ==
  /*
    "abandontransaction",
    "abortrescan",
    "addmultisigaddress",
    "addwitnessaddress",
    "backupwallet",
    "bumpfee",
    "dumpprivkey",
    "dumpwallet",
    "encryptwallet",
    "getaccount",
    "getaccountaddress",
    "getaddressesbyaccount",
    "getbalance",
    "getmasterkeyinfo",
    "getmywords",
    "getnewaddress",
    "getrawchangeaddress",
    "getreceivedbyaccount",
    "getreceivedbyaddress",
    "gettransaction",
    "getunconfirmedbalance",
    "getwalletinfo",
    "importaddress",
    "importmulti",
    "importprivkey",
    "importprunedfunds",
    "importpubkey",
    "importwallet",
    "keypoolrefill",
    "listaccounts",
    "listaddressgroupings",
    "listlockunspent",
    "listreceivedbyaccount",
    "listreceivedbyaddress",
    "listsinceblock",
    "listtransactions",
    "listunspent",
    "listwallets",
    "lockunspent",
    "move",
    "removeprunedfunds",
    "rescanblockchain",
    "sendfrom",
    "sendfromaddress",
    "sendmany",
    "sendtoaddress",
    "setaccount",
    "settxfee",
    "signmessage",
     */
];

function isWhitelisted(method) {
  const inc = whitelist.includes(method);
  return inc;
}
module.exports = {
  whitelist,
  isWhitelisted,
};
