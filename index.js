

const { getRPC } = require("@ravenrebels/ravencoin-rpc");
const cors = require('cors')
const express = require('express');
const getConfig = require("./getConfig");

const app = express()
app.use(cors())
const config = getConfig();
const port = config.local_port || process.env.PORT || 80;


const rpc = getRPC(config.username, config.password, config.raven_url);




const whitelist = require("./whitelist");
app.use(express.json());

app.use(express.static('www'));

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get("/whitelist", (req, res) => {
    res.send(whitelist);
    return;
});


app.post("/rpc", async (req, res) => {


    //check whitelist
    const method = req.body.method;
    const params = req.body.params;
    const inc = whitelist.includes(method)
    if (inc === false) {
        res.status(404).send({
            error: "Not in whitelist",
            description: "Method " + method + " is not supported"
        });
        console.log("Not whitelisted", method);
        return;
    }


    //Lets mimic the real RPC, respond with "result" attribute
    const asdf = await rpc(method, params);
    res.send({ result: asdf });


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

