import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { getContacts } from "./controllers/contacts.js";
import { getContact } from "./controllers/contactById.js";

const PORT = process.env.PORT || 3000;

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(pinoHttp());

  app.get("/contacts", getContacts);

  app.get("/contacts/:contactId", getContact);

  app.use((req, res) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
