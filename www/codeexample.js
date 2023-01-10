const { getRPC } = require("@ravenrebels/ravencoin-rpc");
//@ravenrebels/ravencoin-rpc believes that username/password is mandatory,
//so just send in whatever
const username ="whatever";
const password ="whatever"; 
const rpc = getRPC(username, password, "https://rvn-rpc-testnet.ting.finance/rpc");

const promise = rpc(methods.getassetdata, ["UGLY"]);
promise.catch((e) => {
    console.dir(e);
});

promise.then((response) => {    
        console.log(response);
});