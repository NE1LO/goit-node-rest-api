import "dotenv/config";
import setupServer from "./server.js";
import initMongoDB from "./db/initMongoDb.js";

const startServer = async () => {
  try {
    await initMongoDB();
    setupServer();
    console.log("successful startServer");
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
