const { getRPC, methods } = require("@ravenrebels/ravencoin-rpc");
//@ravenrebels/ravencoin-rpc believes that username/password is mandatory,
//so just send in whatever
const username ="whatever";
const password ="whatever"; 
//Check the ENDPOINT URL, "https://rvn-rpc-testnet.ting.finance/rpc" or "https://rvn-rpc-mainnet.ting.finance/rpc"
const rpc = getRPC(username, password, "$ENDPOINT");

const promise = rpc(methods.getassetdata, ["UGLY"]);
promise.catch((e) => {
    console.dir(e);
});

promise.then((response) => {    
        console.log(response);
});