import {
  getAllContacts as getAllContactsService,
  getOneContact as getOneContactService,
  deleteContact as deleteContactService,
  createContact as createContactService,
  updateContact as updateContactService,
} from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContactsService();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOneContactController = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getOneContactService(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await deleteContactService(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted", contact });
  } catch (error) {
    zz;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await createContactService(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;
  try {
    const contact = await updateContactService(id, updatedContact);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
