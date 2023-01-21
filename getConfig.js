function getConfig() {

    try {
        const config = require("./config.json");
        return config;
    }
    catch (e) {
        console.log("Could not find config.json");
        console.log("Please create a config.json file");

        const template = `
        {
            "concurrency": 2,
            "endpoint":    "https://api.mydomain.com/rpc",
            "environment": "Ravencoin Testnet",
            "local_port":   80,
            "raven_url":    "http://localhost:8888",
            "password":     "dapassword",
            "username":     "dauser",
        }`

        console.log("Example content of config.json");
        console.info(template);

        process.exit(1);
    }

}

module.exports = getConfig;