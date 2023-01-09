const { getRPC, methods } = require("@ravenrebels/ravencoin-rpc");
//@ravenrebels/ravencoin-rpc believes that username/password is mandatory, so just send in anything
const username ="whatever";
const password ="whatever";
const rpc = getRPC(username, password, "https://rpc.ting.finance/rpc");


async function work(){
    const asdf = await rpc("getblockcount", []);
    console.log(asdf);
}

work();
/*
const promise = rpc(methods.getassetdata, ["UGLY"]);
promise.catch((e) => {
    console.dir(e);
});

promise.then((response) => {    
        console.log(response);
});

*/