const redis = require("redis");
const client = redis.createClient(process.env.MAKAUT_REDIS_SERVICE_PORT_6379_TCP);

client.on("error", err => {
  console.log(err);
});

module.exports = client;
