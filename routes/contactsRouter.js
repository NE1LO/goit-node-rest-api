import express from "express";
import {
  getAllContactsController,
  getOneContactController,
  deleteContactController,
  createContactController,
  updateContactController,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsController);
contactsRouter.get("/:id", getOneContactController);
contactsRouter.delete("/:id", deleteContactController);
contactsRouter.post("/", createContactController);
contactsRouter.put("/:id", updateContactController);

export default contactsRouter;
