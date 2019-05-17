import Server from "./server";

Server.start();

const shutdown = done => {};

// Nodemon
process.on("exit", shutdown.bind(null, process.exit));
process.on("SIGINT", shutdown.bind(null, process.exit));
process.on("uncaughtException", shutdown.bind(null, process.exit));
