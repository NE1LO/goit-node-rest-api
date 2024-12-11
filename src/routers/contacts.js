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
import { authenticate } from "../middleware/authenticate.js";
// ========================================================IMPORT FOR VALIDATION
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";
import validateId from "../middleware/validateId.js";
import { validateBody } from "../middleware/validateBody.js";
import { upload } from "../middleware/multer.js";
//#################################################################################
//#################################################################################
const router = Router();

router.use("/contacts/:contactId", authenticate, validateId("contactId"));
//#################################################################################
router.get("/contacts", authenticate, ctrlWrapper(getAllContactsController));
//#################################################################################
router.get(
  "/contacts/:contactId",
  authenticate,
  ctrlWrapper(getContactByIdController)
);

//#=================================================> CREATE NEW CONTACT
router.post(
  "/contacts",
  upload.single("photo"),
  (req, res, next) => {
    console.log("After upload middleware, req.file:", req.file);
    next();
  },
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);
//#################################################################################
router.delete(
  "/contacts/:contactId",
  authenticate,
  ctrlWrapper(deleteContactController)
);
//#################################################################################
router.put(
  "/contacts/:contactId",
  upload.single("photo"),
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController)
);
//#################################################################################
router.patch(
  "/contacts/:contactId",
  upload.single("photo"),
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
