

const { getRPC } = require("@ravenrebels/ravencoin-rpc");
const cors = require('cors')
const express = require('express');
const getConfig = require("./getConfig");
const { whitelist, isWhitelisted } = require("./whitelist");
const app = express()
app.use(cors())
const config = getConfig();
const port = config.local_port || process.env.PORT || 80;


const rpc = getRPC(config.username, config.password, config.raven_url);


app.use(express.json());

app.use(express.static('www'));

app.get("/whitelist", (req, res) => {
    res.send(whitelist);
    return;
});

app.get("/settings", (req, res) => {
    //Expose public parts of config 
    const obj = {
        heading: config.heading,
        environment: config.environment,
        endpoint: config.endpoint
    }
    res.send(obj);
});


app.post("/rpc", (req, res) => {
    try {
        //check whitelist
        const method = req.body.method;
        const params = req.body.params;

        const inc = isWhitelisted(method);
        console.log(method, "whitelisted " + true, new Date().toLocaleString());
        if (inc === false) {
            res.status(404).send({
                error: "Not in whitelist",
                description: "Method " + method + " is not supported"
            });
            console.log("Not whitelisted", method);
            return;
        }

        rpc(method, params).then(result => {
            res.send({ result })
        }).catch(error => {
            res.status(500).send({
                error
            });
        })
    }
    catch (e) {
        console.log("ERROR", e);
        console.dir(e);
        res.status(500).send({
            error: "Something went wrong, check your arguments"
        })
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

