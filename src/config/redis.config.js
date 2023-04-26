import { createClient } from "redis";
const redisPass = process.env.REDIS || "RdFeJ6Xrl3cUzkPhOJal9N838mzCbq9N";

const client = createClient({
  password: redisPass,
  socket: {
    host: "redis-16152.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 16152,
  },
});

async function connectRedis() {
  client.on("error", (err) => console.log("Redis Client Error", err));

  try {
    await client.connect();
  } catch (error) { }
}

function getRedis() {
  return client;
}

export { getRedis, connectRedis };
