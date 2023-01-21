
const { getRPC, methods } = require("@ravenrebels/ravencoin-rpc");
const { default: PQueue } = require('p-queue'); //NOTE version 6 with support for CommonJS
const cacheService = require("./cacheService");
const cors = require('cors')
const express = require('express');
const getConfig = require("./getConfig");
const { whitelist, isWhitelisted } = require("./whitelist");


/* 

1) All requests to Raven core node is queued using "p-queue" and run concurrently, you set concurrency in config.json
2) Most requests are cached for the lifespan of the current block

*/
process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
    console.log('----- Exception origin -----')
    console.log(origin)
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----')
    console.log(promise)
    console.log('----- Reason -----')
    console.log(reason)
});

/*
The cache mechanism uses getbestblockhash to determine when to invalidate the cache
We cant ask for best block has on EVERY request since we can have 200 sim request.
therefor we store a promise to get best block hash, and that promise is blanked every 300 seconds
*/

let lastBestBlockHash = null;
let bestBlockHashPromise = null;
setInterval(() => {
    bestBlockHashPromise = null;
}, 300);



const app = express()
app.use(cors())
const config = getConfig();

//Default to concurrency 1
const queue = new PQueue({ concurrency: config.concurrency || 1 });


const port = config.local_port || process.env.PORT || 80;


const rpc = getRPC(config.username, config.password, config.raven_url);

app.use(express.json());

app.use(express.static('www'));

app.get("/whitelist", (req, res) => {
    res.send(whitelist);
    return;
});


app.get("/getCache", (_, res) => {

    return res.send(cacheService.getKeys());
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




async function addToQueue(request, response) {

    async function work() {

        try {

            const method = request.body.method;
            const params = request.body.params;
            let promise = null;

            const shouldCache = cacheService.shouldCache(method, params);

            if (shouldCache === true) {

                promise = cacheService.get(method, params);
                if (!promise) {
                    promise = rpc(method, params);
                    cacheService.put(method, params, promise);
                }
            }
            else {

                promise = rpc(method, params);
            }
            promise.then(result => {
                return response.send({ result })
            }).catch(error => {
                return response.status(500).send({
                    error
                });
            })
            return promise;
        } catch (e) {
            console.log("Error", e);
            return Promise.resolve();
        }

    }
    queue.add(work);
};
app.post("/rpc", async (req, res) => {
    try {
        //check whitelist
        const method = req.body.method;

        const inc = isWhitelisted(method);

        if (inc === false) {
            res.status(404).send({
                error: "Not in whitelist",
                description: "Method " + method + " is not supported"
            });
            console.log("Not whitelisted", method);
            return;
        }

        let p = bestBlockHashPromise; //need a reference if bestBlockHashPromise is set to null by interval
        if (!p) {
            p = rpc(methods.getbestblockhash, [])
            bestBlockHashPromise = p;
        }

        //Clear cache if new best block hash
        const bestBlockHash = await p;
        if (bestBlockHash !== lastBestBlockHash) {
            cacheService.clear();
            lastBestBlockHash = bestBlockHash;
        }

        //Add RCP call to queue
        addToQueue(req, res);
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




