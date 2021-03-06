import Server from "./server";

Server.start();

const shutdown = (reason: string, done, err?) => {
  console.log("Sutting down server #RbycQQ", reason, err);
  done();
};

// Nodemon
process.on("exit", shutdown.bind(null, "exit", process.exit));
process.on("SIGINT", shutdown.bind(null, "SIGINT", process.exit));
process.on(
  "uncaughtException",
  shutdown.bind(null, "uncaughtException", process.exit)
);
