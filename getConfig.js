function getConfig() {
  try {
    const config = require("./config.json");
    return config;
  } catch (e) {
    console.log("Could not find config.json");
    console.log("Please create a config.json file");

    const template = `
    {
        "concurrency": 4,
        "endpoint": "https://rpc.ting.finance/rpc",
        "environment": "Ravencoin Testnet",
        "local_port": 9999,
        "nodes": [
          {
            "name": "Node number 1",
            "username": "dauser",
            "password": "dapassword",
            "raven_url": "http://localhost:8888"
          },
          {
            "name": "Node number 2", 
            "raven_url": "http://127.0.0.1:8766",
            "password": "secret",
            "username": "secret"
          }
        ]
      }
      `;

    console.log("Example content of config.json");
    console.info(template);

    process.exit(1);
  }
}

module.exports = getConfig;
