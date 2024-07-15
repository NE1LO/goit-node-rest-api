import { Router } from "express";
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middleware/authenticate.js";
// ========================================================IMPORT FOR VALIDATION
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";
import validateId from "../middleware/validateId.js";
import { validateBody } from "../middleware/validateBody.js";

const router = Router();

router.use("/contacts/:contactId", authenticate, validateId("contactId"));
router.get("/contacts", authenticate, ctrlWrapper(getAllContactsController));
router.get(
  "/contacts/:contactId",
  authenticate,
  ctrlWrapper(getContactByIdController)
);

//#=================================================> CREATE NEW CONTACT
router.post(
  "/contacts",
  validateBody(createContactSchema),
  authenticate,
  ctrlWrapper(createContactController)
);
router.delete(
  "/contacts/:contactId",
  authenticate,
  ctrlWrapper(deleteContactController)
);
router.put(
  "/contacts/:contactId",
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(updateContactController)
);
router.patch(
  "/contacts/:contactId",
  authenticate,
  (req, res, next) => {
    console.log("PATCH request received");
    next();
  },
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);
//#=================================================> Registration

export default router;
