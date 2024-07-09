import { Router } from "express";
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
// IMPORT FOR VALIDATION
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contactsValidate.js";
import validateId from "../middleware/validateId.js";
import { validateBody } from "../middleware/validateBody.js";

const router = Router();

router.use("/contacts/:contactId", validateId("contactId"));
router.get("/contacts", ctrlWrapper(getAllContactsController));
router.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));

//#=================================================> CREATE NEW CONTACT
router.post(
  "/contacts",
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);
router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));
router.put(
  "/contacts/:contactId",
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController)
);
router.patch(
  "/contacts/:contactId",
  (req, res, next) => {
    console.log("PATCH request received");
    next();
  },
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);

export default router;
